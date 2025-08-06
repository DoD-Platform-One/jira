<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# jira

![Version: 2.0.3-bb.0](https://img.shields.io/badge/Version-2.0.3--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 10.3.8](https://img.shields.io/badge/AppVersion-10.3.8-informational?style=flat-square) ![Maintenance Track: bb_maintained](https://img.shields.io/badge/Maintenance_Track-bb_maintained-yellow?style=flat-square)

A chart for installing Jira Data Center on Kubernetes

## Upstream References

- <https://atlassian.github.io/data-center-helm-charts/>
- <https://github.com/atlassian/data-center-helm-charts>
- <https://bitbucket.org/atlassian-docker/docker-atlassian-jira/>

## Upstream Release Notes

The [upstream Jira helm chart changelog](https://github.com/atlassian/data-center-helm-charts/blob/main/src/main/charts/jira/Changelog.md) may help when reviewing this package.

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Kubernetes: `>=1.21.x-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install jira chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| proxyName | string | `"jira.dev.bigbang.mil"` |  |
| domain | string | `"dev.bigbang.mil"` |  |
| sso.enabled | bool | `false` |  |
| sso.host | string | `"login.dso.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.jira.enabled | bool | `true` | Toggle Istio VirtualService creation |
| istio.jira.annotations | object | `{}` | Set Annotations for VirtualService |
| istio.jira.labels | object | `{}` | Set Labels for VirtualService |
| istio.jira.gateways | list | `["istio-system/public"]` | Set Gateway for VirtualService |
| istio.jira.hosts | list | `["jira.{{ .Values.domain }}"]` | Set Hosts for VirtualService |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://{{ include \"common.names.fullname\" . }}:{{ .Values.jira.service.port }}"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"1"` |  |
| bbtests.cypress.resources.requests.memory | string | `"2Gi"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"1"` |  |
| bbtests.cypress.resources.limits.memory | string | `"2Gi"` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| helmTestImage | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |
| hpa.enabled | bool | `false` |  |
| hpa.maxReplicas | int | `3` |  |
| hpa.cpu | int | `80` |  |
| hpa.memory | int | `70` |  |
| upstream.nameOverride | string | `"jira"` |  |
| upstream.image.repository | string | `"registry1.dso.mil/ironbank/atlassian/jira-data-center/jira-node-lts"` |  |
| upstream.image.imagePullSecrets[0].name | string | `"private-registry"` |  |
| upstream.image.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.image.tag | string | `"10.3.8"` |  |
| upstream.serviceAccount.create | bool | `true` |  |
| upstream.serviceAccount.name | string | `nil` |  |
| upstream.serviceAccount.imagePullSecrets[0].name | string | `"private-registry"` |  |
| upstream.serviceAccount.annotations | object | `{}` |  |
| upstream.serviceAccount.eksIrsa.roleArn | string | `nil` |  |
| upstream.database.user | string | `nil` |  |
| upstream.database.password | string | `nil` |  |
| upstream.volumes.sharedHome.efs.enabled | bool | `false` |  |
| upstream.volumes.sharedHome.efs.driver | string | `nil` |  |
| upstream.volumes.sharedHome.efs.efsid | string | `nil` |  |
| upstream.volumes.sharedHome.efs.persistentVolumeClaim.create | bool | `false` |  |
| upstream.volumes.sharedHome.efs.persistentVolumeClaim.accessModes[0] | string | `"ReadWriteMany"` |  |
| upstream.volumes.sharedHome.efs.persistentVolumeClaim.storageClassName | string | `nil` |  |
| upstream.volumes.sharedHome.efs.persistentVolumeClaim.resources.requests.storage | string | `"1Gi"` |  |
| upstream.volumes.sharedHome.nfs.enabled | bool | `false` |  |
| upstream.volumes.sharedHome.nfs.server | string | `"IP"` |  |
| upstream.volumes.sharedHome.nfs.path | string | `"/"` |  |
| upstream.volumes.sharedHome.nfs.persistentVolumeClaim.create | bool | `false` |  |
| upstream.volumes.sharedHome.nfs.persistentVolumeClaim.accessModes[0] | string | `"ReadWriteMany"` |  |
| upstream.volumes.sharedHome.nfs.persistentVolumeClaim.storageClassName | string | `nil` |  |
| upstream.volumes.sharedHome.nfs.persistentVolumeClaim.resources.requests.storage | string | `"1Gi"` |  |
| upstream.volumes.sharedHome.nfsPermissionFixer.imageRepo | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi8-minimal"` |  |
| upstream.volumes.sharedHome.nfsPermissionFixer.imageTag | string | `"8.10"` |  |
| upstream.volumes.additional[0].name | string | `"server-xml-j2"` |  |
| upstream.volumes.additional[0].configMap.name | string | `"server-xml-j2"` |  |
| upstream.volumes.additional[0].configMap.defaultMode | int | `484` |  |
| upstream.volumes.additional[1].name | string | `"server-xml"` |  |
| upstream.volumes.additional[1].configMap.name | string | `"server-xml"` |  |
| upstream.volumes.additional[1].configMap.defaultMode | int | `484` |  |
| upstream.volumes.additional[2].name | string | `"footer-vm"` |  |
| upstream.volumes.additional[2].configMap.name | string | `"footer-vm"` |  |
| upstream.volumes.additional[2].configMap.defaultMode | int | `484` |  |
| upstream.jira.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.jira.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.jira.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.jira.containerSecurityContext.runAsUser | int | `2001` |  |
| upstream.jira.containerSecurityContext.runAsGroup | int | `2001` |  |
| upstream.jira.readinessProbe.custom | object | `{}` |  |
| upstream.jira.startupProbe.enabled | bool | `true` |  |
| upstream.jira.livenessProbe.initialDelaySeconds | int | `300` |  |
| upstream.jira.additionalJvmArgs[0] | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.jira.additionalVolumeMounts[0].mountPath | string | `"/opt/atlassian/etc/server.xml.j2"` |  |
| upstream.jira.additionalVolumeMounts[0].name | string | `"server-xml-j2"` |  |
| upstream.jira.additionalVolumeMounts[0].subPath | string | `"server.xml.j2"` |  |
| upstream.jira.additionalVolumeMounts[1].mountPath | string | `"/opt/atlassian/jira/conf/server.xml"` |  |
| upstream.jira.additionalVolumeMounts[1].name | string | `"server-xml"` |  |
| upstream.jira.additionalVolumeMounts[1].subPath | string | `"server.xml"` |  |
| upstream.jira.additionalVolumeMounts[2].mountPath | string | `"/opt/atlassian/jira/atlassian-jira/WEB-INF/classes/templates/plugins/footer/footer.vm"` |  |
| upstream.jira.additionalVolumeMounts[2].name | string | `"footer-vm"` |  |
| upstream.jira.additionalVolumeMounts[2].subPath | string | `"footer.vm"` |  |
| upstream.monitoring.jmxExporterInitContainer.runAsRoot | bool | `false` |  |
| upstream.monitoring.jmxExporterInitContainer.customSecurityContext.runAsUser | int | `1000` |  |
| upstream.monitoring.jmxExporterImageRepo | string | `"registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter"` |  |
| upstream.monitoring.jmxExporterCustomJarLocation | string | `"/var/atlassian/application-data/shared-home/jmx_prometheus_javaagent-0.18.0.jar"` |  |
| upstream.monitoring.grafana.dashboardLabels.grafana_dashboard | string | `"1"` |  |
| upstream.fluentd.imageRepo | string | `"ironbank/opensource/fluentd/fluentd-kubernetes-daemonset"` |  |
| upstream.fluentd.imageTag | string | `"1.18.0"` |  |
| upstream.testPods.resources | object | `{}` |  |
| upstream.testPods.labels | object | `{}` |  |
| upstream.testPods.annotations | object | `{}` |  |
| upstream.testPods.nodeSelector | object | `{}` |  |
| upstream.testPods.tolerations | list | `[]` |  |
| upstream.testPods.affinity | object | `{}` |  |
| upstream.testPods.schedulerName | string | `nil` |  |
| upstream.testPods.image.permissionsTestContainer | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi8-minimal:8.10"` |  |
| upstream.testPods.image.statusTestContainer | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

