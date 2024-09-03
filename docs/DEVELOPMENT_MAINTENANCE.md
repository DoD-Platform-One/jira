# Upgrading to a new version

The below details the steps required to update to a new version of the Jira package.

1. Review the [upstream release notes](https://github.com/atlassian/data-center-helm-charts) for the update you are going to, as well as any versions skipped over between the last BB release and this one. Note any breaking changes and new features.

2. Use `kpt` to pull the upstream chart via the latest tag that corresponds to the application version. From the root of the repo run `kpt pkg update chart@jira-1.17.2 --strategy alpha-git-patch` replacing `jira-1.17.2` with the version tag you got in step 1.

3. Based on the upstream changelog review from earlier, make any changes required to resolve breaking changes and reconcile the Big Bang modifications.

4. Modify the `version` in `Chart.yaml`. Also modify the `appVersion` and the `bigbang.dev/applicationVersions` to the new upstream version of Jira.
    ```yaml
    dependencies:
    - name: common
      version: X.X.X
      repository: https://atlassian.github.io/data-center-helm-charts
    - name: gluon
      repository: oci://registry1.dso.mil/bigbang
      version: X.X.X
    ```

5. Update helm dependencies to latest library versions.
    ```
    helm dependency update ./chart
    ```

6. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Jira to x.x.x`).

7. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

8. Open an MR in "Draft" status and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't. Follow the steps below for manual testing.

9. Once all manual testing is complete take your MR out of "Draft" status and add the review label.

# Testing for updates

NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point jira to your branch. For an upgrade do an install with jira pointing to the latest tag, then perform a helm upgrade with jira pointing to your branch.

To install Jira as a community package in a Big Bang Kubernetes Cluster, save the following YAML to a file (eg, jira.yaml):

See https://docs-bigbang.dso.mil/latest/docs/guides/deployment-scenarios/extra-package-deployment/#Wrapper-Deployment for more details.

```yaml
# You will need these if kyverno is enabled (which it is by default)
kyvernoPolicies:
  values:
    policies:
      require-non-root-user:
        exclude:
          any:
            - resources:
                namespaces:
                  - jira
                names:
                  - jira*
      disallow-auto-mount-service-account-token:
        exclude:
          any:
            - resources:
                namespaces:
                  - jira
                names:
                  - jira*

packages:
  # This will be used as the namespace for the install, as well as the name of the helm release. If this is changed, the destination service (below) needs to also be changed.
  jira:
    dependsOn:
      # - name: authservice
      #   namespace: bigbang
    enabled: true
    # Disabling this will bypass creating the istio VirtualService and NetworkPolicies.
    wrapper:
      enabled: true
    git:
      repo: https://repo1.dso.mil/big-bang/product/community/jira
      # It is recommended to update this to the latest bb tag
      tag: X.XX.XX-bb.X
      path: chart
    # This section is ignored if `wrapper.enabled`, above, is false. In this case, creation of an ingress for web access is left as an exercise for the reader.
    istio:
      enabled: true
      # We should test with this
      hardened:
        enabled: true
      hosts:
        - names:
            - "jira"
          gateways:
            - "public"
          destination:
            port: 8080
    # Anything in this section is passed to the jira chart directly; this allows all of your bigbang configuration to be in a single place.
    values:
      jira:
        service:
          port: 8080
      # Adding the following podLabels will properly label the package to be connected in Kiali (if Kiali is enabled)
      # Other labels can be added with or without templating
      podLabels:
        app: "{{ \"{{ .Chart.Name }}\" }}"
        version: "{{ \"{{ .Chart.AppVersion }}\" }}"
```

Then install/update bigbang via the standard `helm upgrade` command, adding `-f <YAML file location>` to the end. This will install Jira into the named namespace.

Example:
  ```shell
  helm upgrade -i bigbang ./chart -n bigbang --create-namespace --set registryCredentials.username=<registry1.username> --set registryCredentials.password=<registry1.password> -f ./tests/test-values.yaml -f ../bigbang/chart/ingress-certs.yaml -f <YAML file location>/jira.yaml
  ```

This method is recommended because it will also take care of creating private registry credentials, the istio virtual service, and network policies. Once the installation is complete, the Jira UI will be reachable via `https://jira.<your bigbang domain>`

Testing Steps:
- Ensure all resources have reconciled and are healthy
- Ensure the application is resolvable at `jira.dev.bigbang.mil`
- Run the cypress tests to confirm functionality of adding and deleting an application via the UI
    ```shell
    cd ./chart/tests
    cp .example.cypress.config.js cypress.config.js
    export cypress_url=https://jira.dev.bigbang.mil/
    npx cypress run
    ```
- NOTE: the install can take 10+ minutes

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Big Bang Chart Additions

This package has a some additions to the chart in order to facilitate Party Bus using custom liveness and readiness probes as seen below for examples, it is necessary to keep these items intact.

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
# Big Bang Integration Testing

### Files that require integration testing
* `chart/templates/bigbang/*`
* `chart/values.yaml` (If it changes anything in:)
  * Monitoring
  * Istio hardening
  * Network policies
  * Kyverno policies
  * Service definition
  * TLS settings

As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages.

    - To do this, at a minimum, you will need to follow the instructions at [bigbang/docs/developer/test-package-against-bb.md](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) with changes for Jira enabled (the below is a reference, actual changes could be more depending on what changes where made to Jira in the pakcage MR).

```
packages:
  jira:
    enabled: true
    wrapper:
      enabled: true
    git:
      repo: https://repo1.dso.mil/big-bang/product/community/jira
      tag: Null
      branch: <Insert-branch-being-tested>
      path: chart
    istio:
      enabled: true
      hardened:
        enabled: true
      hosts:
        - names:
            - "jira"
          gateways:
            - "public"
          destination:
            port: 8080
    values:
      jira:
        service:
          port: 8080
```


### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
