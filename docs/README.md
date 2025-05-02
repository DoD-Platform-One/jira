# Jira

* git clone https://github.com/stevehipwell/helm-charts.git

* cd helm-charts

* helm dep update charts/jira-software/

* helm template jira charts/jira-software/ -f ../generated/values.yaml > ../generated/generated.yaml


# Deployment Through Big Bang

To install Jira as a community package in a Big Bang Kubernetes Cluster, save the following YAML to a file (eg, jira.yaml):

See https://docs-bigbang.dso.mil/latest/docs/guides/deployment-scenarios/extra-package-deployment/#Wrapper-Deployment for more details.

```yaml
packages:
  # This will be used as the namespace for the install, as well as the name of the helm release. If this is changed, the destination service (below) needs to also be changed.
  jira:
    dependsOn:
      #- name: istio #<-- Set to "istiod" when  big bang values .istioGateway.enabled=true
      #  namespace: bigbang
    enabled: true
    # Disabling this will bypass creating the istio VirtualService and NetworkPolicies.
    wrapper:
      enabled: true
    git:
      repo: https://repo1.dso.mil/big-bang/product/community/jira
      # It is recommended to update this to the latest bb tag
      tag: 1.22.9-bb.1 #<-- Update as need to most recent release.
      path: chart
    # This section is ignored if `wrapper.enabled`, above, is false. In this case, creation of an ingress for web access is left as an exercise for the reader.
    istio:
      enabled: true
      hosts:
        - names:
            # Sub-URL for reaching the web UI; it will be reachable with this, plus your bigbang domain, eg, jira.dev.bigbang.mil
            - jira
          gateways:
            - public #<-- Set to "pubilic-ingressgateway" when  big bang
          destination:
            # The second portion of this URL is the namespace; if it was changed above, it needs to be changed here as well.
            service: jira.jira.svc.cluster.local
            port: 8080
    # Anything in this section is passed to the jira chart directly; this allows all of your bigbang configuration to be in a single place.
    values:
      jira:
        service:
          port: 8080

```

Then install/update bigbang via the standard `helm upgrade` command, adding `-f <YAML file location>` to the end. This will install Jira into the named namespace. 

This method is recommended because it will also take care of creating private registry credentials, the istio virtual service, and network policies. Once the installation is complete, the Jira UI will be reachable via `https://jira.<your bigbang domain>`