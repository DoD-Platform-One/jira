# Upgrading to a new version

The below details the steps required to update to a new version of the Jira package.

1. Review the [upstream release notes](https://github.com/atlassian/data-center-helm-charts) for the update you are going to, as well as any versions skipped over between the last BB release and this one. Note any breaking changes and new features.

2. Use `kpt` to pull the upstream chart via the latest tag that corresponds to the application version

3. Based on the upstream changelog review from earlier, make any changes required to resolve breaking changes and reconcile the Big Bang modifications.

4. Modify the `version` in `Chart.yaml`. Also modify the `appVersion` and the `bigbang.dev/applicationVersions` to the new upstream version of Jira.

5. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Jira to x.x.x`).

6. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

7. Open an MR in "Draft" status and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't. Follow the steps below for manual testing.

8. Once all manual testing is complete take your MR out of "Draft" status and add the review label.

# Testing for updates

NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point jira to your branch. For an upgrade do an install with jira pointing to the latest tag, then perform a helm upgrade with jira pointing to your branch.

You will want to install with something similar:
```shell
helm upgrade -i jira ./chart --create-namespace -n jira --set registryCredentials.username=<registry1.username> --set registryCredentials.password=<registry1.password> -f ./tests/test-values.yaml -f ../bigbang/chart/ingress-certs.yaml
```

Testing Steps:
- Ensure all resources have reconciled and are healthy
- Ensure the application is resolvable at `jira.bigbang.dev`
- Run the cyrpress tests to confirm functionality of adding and deleting an application via the UI

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Big Bang Chart Additions

This package has a some additions to the chart inorder to facilitate Party Bus using custom liveness and readiness probes as seen below for examples, it is neccessary to keep these items intact. 

Here's the section of the `chart/values.yaml` file where these additions are configured:

```yaml
    # -- Custom readiness probe configuration.
    # if custom is {}, defaults to httpGet.
    custom: {}
    #  exec:
    #    command:
    #    - /bin/bash 
    #    - -c
    #    - curl http://some/endpoint && exit 0

  # Confirm that Jira is up and running with a Liveness
  # https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command
  #
```
Here's the sections of the `chart/templates/statefulset.yaml` file where these additions are configured:
```yaml

          {{- if .Values.jira.readinessProbe.custom }}
            {{- toYaml .Values.jira.readinessProbe.custom | nindent 12 }}
          {{- else }}
            .
            .
            .
          {{- if .Values.jira.livenessProbe.custom }}
            {{- toYaml .Values.jira.livenessProbe.custom | nindent 12 }}
          {{- else }}
            httpGet:
              port: {{ .Values.jira.ports.http }}
              path: {{ .Values.jira.service.contextPath }}/status
            {{- end }}  
```