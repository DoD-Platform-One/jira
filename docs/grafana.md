# Grafana Integration

In order to integrate Jira log data in a Big Bang cluster, include the package when installing the main helm chart under the [`packages`](https://docs-bigbang.dso.mil/latest/docs/guides/deployment-scenarios/extra-package-deployment/) section. This key is intended for use with mission applications or other apps which are not directly included and integrated within Big Bang. The below instructions should work with a basic Big Bang configuration, running only Flux, Istio, and the Big Bang packages referenced below. This can be easily appended to the product generated by the [Quickstart guide](https://docs-bigbang.dso.mil/latest/docs/guides/deployment-scenarios/quickstart/)

```yaml
packages:
  jira:
    dependsOn:
      - name: monitoring
        namespace: bigbang
    enabled: true
    git:
      repo: https://repo1.dso.mil/big-bang/product/community/jira
      # It is recommended to update this to the latest bb tag
      tag: X.XX.XX-bb.X
      path: chart
    # Anything in this section is passed to the jira chart directly; this allows all of your bigbang configuration to be in a single place.
    values:
      jira:
        service:
          port: 8080
      istio:
        jira:
          gateways:
            - istio-system/public
        enabled: true
      # Grafana dashboards
      monitoring:
        exposeJmxMetrics: true
        serviceMonitor:
          create: true
        grafana:
          createDashboards: true
#Ensure the monitoring stack is up to receive this info
monitoring:
  enabled: true
grafana:
  enabled: true
loki: 
  enabled: true
promtail:
  enabled: true
```