# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [1.20.0-bb.0] - 2024-06-07
### Updated
- Gluon 0.4.10 -> 0.5.0
- Update dependency jira-node-lts from 9.12.7 to 9.12.8 
- Update dependency ubi8-minimal from 8.9 to 8.10
- Cypress dependency update 13.10.0 -> 13.11.0

## [1.19.0-bb.5] - 2024-06-04
### Updated
- Cypress dependency update 13.8.0 -> 13.10.0

## [1.19.0-bb.4] - 2024-05-24
### Updated
- Docs to better show how to install and test
- Tests to run locally properly

## [1.19.0-bb.3] - 2024-05-07
### Added
- Istio Sidecar to restrict egress traffic to `REGISTRY_ONLY`, or as defined by `.Values.istio.hardened.outboundTrafficPolicyMode`
- Istio ServiceEntry to dynamically create entries from `.Values.istio.hardened.customServiceEntries` to explicitly allow egress

## [1.19.0-bb.2] - 2024-05-01
### Added
- Cypress dependency update 13.8.0 -> 13.8.1

## [1.19.0-bb.1] - 2024-04-26
### Changed
- Updated gluon version from 0.4.9 to 0.4.10

## [1.19.0-bb.0] - 2024-04-23
### Updated
- Updated gluon (dependency) from 0.4.8 to 0.4.9, jira-node-lts from 9.12.5 to 9.12.7@1.19.0, cypress (dependency) to 13.7.3 (Renovate)

## [1.18.1-bb.1] - 2024-04-09
### Added
- Added the ability to deploy additional custom NetworkPolicy objects via override values (see chart/templates/bigbang/additional-networkpolicies.yaml)

## [1.18.1-bb.0] - 2024-04-02
### Updated
- registry1.dso.mil/ironbank/opensource/fluentd/fluentd-kubernetes-daemonset from 1.16.2 to 1.16.3

## [1.18.0-bb.0] - 2024-03-14
### Added
- Update dependency jira-node-lts from 9.12.4 to 9.12.5

## [1.17.2-bb.2] - 2024-02-20
### Added
- Update dependency jira-node-lts from 9.12.2 to 9.12.4
- Upgraded common chart from 1.2.5 to 1.2.6

## [1.17.2-bb.1] - 2024-2-02
### Added
- Upgraded gluon (dependency) from 0.4.4 to 0.4.8, previous version didnt run `helm dep update`

## [1.17.2-bb.0] - 2024-1-22
### Added
- Update dependency jira-node-lts from 9.12.0 to 9.12.2
- Upgraded gluon (dependency) from 0.4.4 to 0.4.7

## [1.17.0-bb.0] - 2023-12-19
### Added
- Update Jira to 1.17.0 
- Update dependency jira-node-lts from 9.4.12 to 9.12.0 

## [1.16.6-bb.4] - 2023-12-15
### Added
- Updated missed dependency fluentd-kubernetes-daemonset from 1.16.2 to 1.16.3

## [1.16.6-bb.3] - 2023-11-30
### Added
- Updated dependency fluentd-kubernetes-daemonset from 1.16.2 to 1.16.3

## [1.16.6-bb.2] - 2023-11-17
### Added
- Updated image jira-node-lts from v9.4.11 to v9.4.12
- Updated image big-bang/base from 2.0.0 to 2.1.0
- Updated image ubi8-minimal from 8.8 to 8.9

## [1.16.6-bb.1] - 2023-11-02
### Added
- Converting from jira-node to jira-node-lts image, reverting image from 9.11.2 to 9.4.11

## [1.16.6-bb.0] - 2023-11-01
### Added
- Upgraded gluon (dependency) from 0.4.1 to 0.4.4. 
- Upgraded common (dependency) from 1.2.4 to 1.2.5
- Upgraded chart version from 1.16.0 to 1.16.6

## [1.16.5-bb.0] - 2023-10-25
### Added
- Updated image jira-node from v9.10.0 to v9.11.2
- Upgraded chart version from 1.16.0 to 1.16.5

## [1.16.0-bb.5] - 2023-10-18
### Changed
- Custom LivenessProbe Fix

## [1.16.0-bb.4] - 2023-09-27
### Added
- Upgraded gluon (dependency) from 0.4.0 to 0.4.1. 
- Changed cypress version to 13.0.0

## [1.16.0-bb.3] - 2023-10-02
### Added
- Added baseline grafana configuration and package instructions to include

## [1.16.0-bb.2] - 2023-09-22
### changed
- made liveness probe http/tcp port more dynamic 


## [1.16.0-bb.1] - 2023-09-20
### Added
- Added ability to use custom (exec) live and ready probes back in. 

## [1.16.0-bb.0] - 2023-09-18
### Changed
- Upstream Added helper for JMX Metrics permissions
- Added support for extra SSL truststores to be passed as secrets

## [1.15.1-bb.5] - 2023-09-11
### Changed
- Changed gluon version to 0.4.0

## [1.15.1-bb.4] - 2023-09-07
### Added
- Add in security constraints to be more kyverno friendly and more secure

## [1.15.1-bb.3] - 2023-09-07
### Added
- Added in initial set of Network Policies

## [1.15.1-bb.2] - 2023-09-06
### Added
- Update apiVersion for HPA

## [1.15.1-bb.1] - 2023-08-29
### Added
- Validate resource and test limits

## [1.15.1-bb.0] - 2023-08-18
### Added
- Upgraded chart version from 1.10.0 to 1.15.1
- Updated Jira to version `9.10.0`
- Updated Atlassian common and gluon

## [1.10.0-bb.1] - 2023-06-23
### Added
- Added ability to use custom (exec) live and ready probes. 

## [1.10.0-bb.0] - 2023-03-13
### Updated
- Updated Jira to version `9.6.0`

## [1.8.1-bb.0] - 2022-01-18
### Updated
- Updated Jira to version `9.4.1`
- Chart to version `jira-1.8.1`

## [1.6.0-bb.2] - 2022-01-17
### Changed
- Update gluon to new registry1 location + latest version (0.3.2)

## [1.6.0-bb.1] - 2022-12-02
### Added
- Hostname updates to BB VirtualService

## [1.6.0-bb.0] - 2022-10-13
### Added
- Updated to appVersion 9.2.0, chart version 1.6.0

## [1.4.1-bb.1] - 2022-07-07
### Added
- Added livenessProbe configuration for statefulset pods

## [1.4.1-bb.0] - 2022-07-06
### Changed
- Updated to appVersion 9.0.0, chart version 1.4.1

## [1.4.0-bb.0] - 2022-05-25
### Changed
- Updated to appVersion 8.22.0, chart version 1.4.0

## [1.1.0-bb.2] - 2022-05-11
### Added
- Horizontal pod scaling yaml added with value file update

## [1.1.0-bb.1] - 2022-04-28
### Changed
- Value in server.xml is change to disable tomcat error page

## [1.1.0-bb.0] - 2022-02-10
### Changed
- Upgrade to appVersion 8.21.0 chart version 1.1.0

## [0.1.0-bb.10] - 2022-02-01
### Added
- LICENSE file

## [0.1.0-bb.9] - 2022-01-05
### Added
- footer.vm file added to files section of the chart
- footer configmap template created
- Value.yaml  file updated with footer configmap volume mount.

## [0.1.0-bb.8] - 2021-12-06
### Added
- renovate.json added for image tracking with IB

## [0.1.0-bb.7] - 2021-09-14
### Updated
- Moved image to Ironbank, and updated to version 8.18.1

## [0.1.0-bb.6] - 2021-06-21
### Modified
- Parameterization of vs as well as proxyName.
- Lifecycle of pod changes.

## [0.1.0-bb.5] - 2021-06-10
### Fix
- Partybus modifications

## [0.1.0-bb.4] - 2021-04-01
### Fix
- istio to false by default

## [0.1.0-bb.3] - 2021-03-10
### Fix
- Updated test-values.yml with only overrides
- Using ironbank modified image

## [0.1.0-bb.2] - 2021-02-25

### Added

- Initial chart built from upstream jira-0.4.0 with bigbang additions
