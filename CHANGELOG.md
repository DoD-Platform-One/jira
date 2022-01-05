# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
