# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
