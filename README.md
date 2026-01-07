<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# jira

![Version: 2.0.8-bb.1](https://img.shields.io/badge/Version-2.0.8--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 11.3.11](https://img.shields.io/badge/AppVersion-11.3.11-informational?style=flat-square) ![Maintenance Track: bb_maintained](https://img.shields.io/badge/Maintenance_Track-bb_maintained-yellow?style=flat-square)

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
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://{{ include \"common.names.fullname\" . }}:{{ .Values.upstream.jira.service.port }}"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"1"` |  |
| bbtests.cypress.resources.requests.memory | string | `"2Gi"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"1"` |  |
| bbtests.cypress.resources.limits.memory | string | `"2Gi"` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| hpa.enabled | bool | `false` |  |
| hpa.maxReplicas | int | `3` |  |
| hpa.cpu | int | `80` |  |
| hpa.memory | int | `70` |  |
| dbSecret.enabled | bool | `false` |  |
| dbSecret.secretName | string | `"jira-database"` |  |
| dbSecret.databaseUser | string | `""` |  |
| dbSecret.databasePassword | string | `""` |  |
| dbSecret.usernameSecretKey | string | `""` |  |
| dbSecret.passwordSecretKey | string | `""` |  |
| upstream | object | Upstream chart values  | Values to pass to [the upstream Jira chart](https://github.com/atlassian/data-center-helm-charts/blob/main/src/main/charts/jira/values.yaml) |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

