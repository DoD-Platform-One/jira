<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# jira

![Version: 2.0.2-bb.1](https://img.shields.io/badge/Version-2.0.2--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 10.3.8](https://img.shields.io/badge/AppVersion-10.3.8-informational?style=flat-square) ![Maintenance Track: bb_maintained](https://img.shields.io/badge/Maintenance_Track-bb_maintained-yellow?style=flat-square)

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
| replicaCount | int | `1` | The initial number of Jira pods that should be started at deployment time. Note that Jira requires manual configuration via the browser post deployment after the first pod is deployed. This configuration must be completed before scaling up additional pods. As such this value should always be kept as 1, but can be altered once manual configuration is complete.  |
| ordinals | object | `{"enabled":false,"start":0}` | Set a custom start ordinal number for the K8s stateful set. Note that this depends on the StatefulSetStartOrdinal K8s feature gate, which has entered beta state with K8s version 1.27.  |
| ordinals.enabled | bool | `false` | Enable only if StatefulSetStartOrdinal K8s feature gate is available.  |
| ordinals.start | int | `0` | Set start ordinal to a positive integer, defaulting to 0.  |
| updateStrategy | object | `{}` | StatefulSet update strategy. When unset defaults to Rolling update. See: https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets  |
| image.repository | string | `"registry1.dso.mil/ironbank/atlassian/jira-data-center/jira-node-lts"` | The Jira Docker image to use https://hub.docker.com/r/atlassian/jira-software  |
| image.imagePullSecrets | list | `[{"name":"private-registry"}]` | Optional image repository pull secret |
| image.pullPolicy | string | `"IfNotPresent"` | Image pull policy  |
| image.tag | string | `"10.3.8"` | The docker image tag to be used - defaults to the Chart appVersion  |
| serviceAccount.create | bool | `true` | Set to 'true' if a ServiceAccount should be created, or 'false' if it already exists.  |
| serviceAccount.name | string | `nil` | The name of the ServiceAccount to be used by the pods. If not specified, but the "serviceAccount.create" flag is set to 'true', then the ServiceAccount name will be auto-generated, otherwise the 'default' ServiceAccount will be used. https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server  |
| serviceAccount.imagePullSecrets | list | `[]` | For Docker images hosted in private registries, define the list of image pull secrets that should be utilized by the created ServiceAccount https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod  |
| serviceAccount.annotations | object | `{}` | Annotations to add to the ServiceAccount (if created)  |
| serviceAccount.eksIrsa.roleArn | string | `nil` |  |
| database.type | string | `nil` | The database type that should be used. If not specified, then it will need to be provided via the browser during manual configuration post deployment. Valid values include: 'postgres72' 'mysql57' 'mysql8' 'oracle10g' 'mssql' 'postgresaurora96' https://atlassian.github.io/data-center-helm-charts/userguide/CONFIGURATION/#databasetype  |
| database.url | string | `nil` | The jdbc URL of the database. If not specified, then it will need to be provided via the browser during manual configuration post deployment. Example URLs include: 'jdbc:postgresql://dbhost:5432/dbname' 'jdbc:mysql://dbhost/dbname' 'jdbc:sqlserver://dbhost:1433;databaseName=dbname' 'jdbc:oracle:thin:@dbhost:1521:SID' https://atlassian.github.io/data-center-helm-charts/userguide/CONFIGURATION/#databaseurl  |
| database.user | string | `nil` | Username associated with the database being used. |
| database.password | string | `nil` | Password associated with the database being used. |
| database.driver | string | `nil` | The Java class name of the JDBC driver to be used. If not specified, then it will need to be provided via the browser during manual configuration post deployment. Valid drivers are: 'org.postgresql.Driver' 'com.mysql.jdbc.Driver' 'oracle.jdbc.OracleDriver' 'com.microsoft.sqlserver.jdbc.SQLServerDriver' https://atlassian.github.io/data-center-helm-charts/userguide/CONFIGURATION/#databasedriver:  |
| database.credentials.secretName | string | `nil` | from-literal=password=<user_password>' https://kubernetes.io/docs/concepts/configuration/secret/#opaque-secrets  |
| database.credentials.usernameSecretKey | string | `"username"` | The key ('username') in the Secret used to store the database login username  |
| database.credentials.passwordSecretKey | string | `"password"` | The key ('password') in the Secret used to store the database login password  |
| volumes.localHome.persistentVolumeClaim.create | bool | `false` | If 'true', then a 'PersistentVolume' and 'PersistentVolumeClaim' will be dynamically created for each pod based on the 'StorageClassName' supplied below.  |
| volumes.localHome.persistentVolumeClaim.storageClassName | string | `nil` | Specify the name of the 'StorageClass' that should be used for the local-home volume claim.  |
| volumes.localHome.persistentVolumeClaim.resources | object | `{"requests":{"storage":"1Gi"}}` | Specifies the standard K8s resource requests and/or limits for the local-home volume claims.  |
| volumes.localHome.persistentVolumeClaimRetentionPolicy.whenDeleted | string | `nil` | Configures the volume retention behavior that applies when the StatefulSet is deleted.  |
| volumes.localHome.persistentVolumeClaimRetentionPolicy.whenScaled | string | `nil` | Configures the volume retention behavior that applies when the replica count of the StatefulSet is reduced.  |
| volumes.localHome.customVolume | object | `{}` | Static provisioning of local-home using K8s PVs and PVCs  NOTE: Due to the ephemeral nature of pods this approach to provisioning volumes for pods is not recommended. Dynamic provisioning described above is the prescribed approach.  When 'persistentVolumeClaim.create' is 'false', then this value can be used to define a standard K8s volume that will be used for the local-home volume(s). If not defined, then an 'emptyDir' volume is utilised. Having provisioned a 'PersistentVolume', specify the bound 'persistentVolumeClaim.claimName' for the 'customVolume' object. https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static  |
| volumes.localHome.mountPath | string | `"/var/atlassian/application-data/jira"` | Specifies the path in the Jira container to which the local-home volume will be mounted.  |
| volumes.localHome.subPath | string | `nil` | Specifies the sub-directory of the local-home volume that will be mounted in to the Jira container.  |
| volumes.sharedHome.efs.enabled | bool | `false` |  |
| volumes.sharedHome.efs.driver | string | `nil` | The EFS CSI driver used for mounting. For AWS EFS use 'efs.csi.aws.com'.  |
| volumes.sharedHome.efs.efsid | string | `nil` | The File System ID of the EFS volume to mount   |
| volumes.sharedHome.efs.persistentVolumeClaim.create | bool | `false` |  |
| volumes.sharedHome.efs.persistentVolumeClaim.accessModes[0] | string | `"ReadWriteMany"` |  |
| volumes.sharedHome.efs.persistentVolumeClaim.storageClassName | string | `nil` | Specify the name of the 'StorageClass' that should be used for the 'shared-home' volume claim.         |
| volumes.sharedHome.efs.persistentVolumeClaim.resources | object | `{"requests":{"storage":"1Gi"}}` | Specifies the standard K8s resource requests and/or limits for the shared-home volume claims.         |
| volumes.sharedHome.nfs.enabled | bool | `false` |  |
| volumes.sharedHome.nfs.server | string | `"IP"` | NFS server IP or hostname to mount from.  |
| volumes.sharedHome.nfs.path | string | `"/"` | NFS path to mount on the server.  |
| volumes.sharedHome.nfs.persistentVolumeClaim.create | bool | `false` |  |
| volumes.sharedHome.nfs.persistentVolumeClaim.accessModes[0] | string | `"ReadWriteMany"` |  |
| volumes.sharedHome.nfs.persistentVolumeClaim.storageClassName | string | `nil` | The name of the StorageClass to use with the NFS volume.  |
| volumes.sharedHome.nfs.persistentVolumeClaim.resources | object | `{"requests":{"storage":"1Gi"}}` | Specifies the standard K8s resource requests and/or limits for the shared-home volume claims.  |
| volumes.sharedHome.persistentVolumeClaim.create | bool | `false` | If 'true', then a 'PersistentVolumeClaim' and 'PersistentVolume' will be dynamically created for shared-home based on the 'StorageClassName' supplied below.  |
| volumes.sharedHome.persistentVolumeClaim.accessModes | list | `["ReadWriteMany"]` | Specify the access modes that should be used for the 'shared-home' volume claim. Note: 'ReadWriteOnce' (RWO) is suitable only for single-node installations. Be aware that changing the access mode of an existing PVC might be impossible, as the PVC spec is immutable. https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes  |
| volumes.sharedHome.persistentVolumeClaim.storageClassName | string | `nil` | Specify the name of the 'StorageClass' that should be used for the 'shared-home' volume claim.  |
| volumes.sharedHome.persistentVolumeClaim.resources | object | `{"requests":{"storage":"1Gi"}}` | Specifies the standard K8s resource requests and/or limits for the shared-home volume claims.  |
| volumes.sharedHome.customVolume | object | `{}` | Static provisioning of shared-home using K8s PVs and PVCs  When 'persistentVolumeClaim.create' is 'false', then this value can be used to define a standard K8s volume that will be used for the shared-home volume. If not defined, then an 'emptyDir' volume is utilised. Having provisioned a 'PersistentVolume', specify the bound 'persistentVolumeClaim.claimName' for the 'customVolume' object. https://kubernetes.io/docs/concepts/storage/persistent-volumes/#static https://atlassian.github.io/data-center-helm-charts/examples/storage/aws/SHARED_STORAGE/  |
| volumes.sharedHome.mountPath | string | `"/var/atlassian/application-data/shared-home"` | Specifies the path in the Jira container to which the shared-home volume will be mounted.  |
| volumes.sharedHome.subPath | string | `nil` | Specifies the sub-directory of the shared-home volume that will be mounted in to the Jira container.  |
| volumes.sharedHome.nfsPermissionFixer.enabled | bool | `true` | If 'true', this will alter the shared-home volume's root directory so that Jira can write to it. This is a workaround for a K8s bug affecting NFS volumes: https://github.com/kubernetes/examples/issues/260  |
| volumes.sharedHome.nfsPermissionFixer.mountPath | string | `"/shared-home"` | The path in the K8s initContainer where the shared-home volume will be mounted  |
| volumes.sharedHome.nfsPermissionFixer.imageRepo | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi8-minimal"` | Image repository for the permission fixer init container. Defaults to alpine  |
| volumes.sharedHome.nfsPermissionFixer.imageTag | string | `"8.10"` | Image tag for the permission fixer init container. Defaults to latest  |
| volumes.sharedHome.nfsPermissionFixer.resources | object | `{}` | Resources requests and limits for nfsPermissionFixer init container See: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/  |
| volumes.sharedHome.nfsPermissionFixer.command | string | `nil` | By default, the fixer will change the group ownership of the volume's root directory to match the Jira container's GID (2001), and then ensures the directory is group-writeable. If this is not the desired behaviour, command used can be specified here.  |
| volumes.additional | list | `[{"configMap":{"defaultMode":484,"name":"server-xml-j2"},"name":"server-xml-j2"},{"configMap":{"defaultMode":484,"name":"server-xml"},"name":"server-xml"},{"configMap":{"defaultMode":484,"name":"footer-vm"},"name":"footer-vm"}]` | Defines additional volumes that should be applied to all Jira pods. Note that this will not create any corresponding volume mounts; those needs to be defined in jira.additionalVolumeMounts  |
| ingress.create | bool | `false` | Set to 'true' if an Ingress Resource should be created. This depends on a pre-provisioned Ingress Controller being available.  |
| ingress.openShiftRoute | bool | `false` | Set to true if you want to create an OpenShift Route instead of an Ingress  |
| ingress.routeHttpHeaders | object | `{}` | routeHttpHeaders defines policy for HTTP headers. Applicable to OpenShift Routes only  |
| ingress.className | string | `"nginx"` | The class name used by the ingress controller if it's being used.  Please follow documentation of your ingress controller. If the cluster contains multiple ingress controllers, this setting allows you to control which of them is used for Atlassian application traffic.  |
| ingress.nginx | bool | `true` | Set to 'true' if the Ingress Resource is to use the K8s 'ingress-nginx' controller. https://kubernetes.github.io/ingress-nginx/  This will populate the Ingress Resource with annotations that are specific to the K8s ingress-nginx controller. Set to 'false' if a different controller is to be used, in which case the appropriate annotations for that controller must be specified below under 'ingress.annotations'.  |
| ingress.maxBodySize | string | `"250m"` | The max body size to allow. Requests exceeding this size will result in an HTTP 413 error being returned to the client.  |
| ingress.proxyConnectTimeout | int | `60` | Defines a timeout for establishing a connection with a proxied server. It should be noted that this timeout cannot usually exceed 75 seconds.  |
| ingress.proxyReadTimeout | int | `60` | Defines a timeout for reading a response from the proxied server. The timeout is set only between two successive read operations, not for the transmission of the whole response. If the proxied server does not transmit anything within this time, the connection is closed.  |
| ingress.proxySendTimeout | int | `60` | Sets a timeout for transmitting a request to the proxied server. The timeout is set only between two successive write operations, not for the transmission of the whole request. If the proxied server does not receive anything within this time, the connection is closed.  |
| ingress.host | string | `nil` | The fully-qualified hostname (FQDN) of the Ingress Resource. Traffic coming in on this hostname will be routed by the Ingress Resource to the appropriate backend Service.  |
| ingress.path | string | `nil` | The base path for the Ingress Resource. For example '/jira'. Based on a 'ingress.host' value of 'company.k8s.com' this would result in a URL of 'company.k8s.com/jira'. Default value is 'jira.service.contextPath'  |
| ingress.annotations | object | `{}` | The custom annotations that should be applied to the Ingress Resource. If using an ingress-nginx controller be sure that the annotations you add here are compatible with those already defined in the 'ingess.yaml' template  |
| ingress.https | bool | `true` | Set to 'true' if browser communication with the application should be TLS (HTTPS) enforced.  |
| ingress.tlsSecretName | string | `nil` | The name of the K8s Secret that contains the TLS private key and corresponding certificate. When utilised, TLS termination occurs at the ingress point where traffic to the Service, and it's Pods is in plaintext.  Usage is optional and depends on your use case. The Ingress Controller itself can also be configured with a TLS secret for all Ingress Resources. https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets https://kubernetes.io/docs/concepts/services-networking/ingress/#tls  |
| ingress.additionalPaths | list | `[]` | Additional paths to be added to the Ingress resource to point to different backend services  |
| jira.useHelmReleaseNameAsContainerName | bool | `false` | Whether the main container should acquire helm release name. The default, the container name is jira (Helm chart name)  |
| jira.service.port | int | `80` | The port on which the Jira K8s Service will listen  |
| jira.service.type | string | `"ClusterIP"` | The type of K8s service to use for Jira  |
| jira.service.nodePort | string | `nil` | Only applicable if service.type is NodePort. NodePort for Jira service  |
| jira.service.sessionAffinity | string | `"None"` | Session affinity type. If you want to make sure that connections from a particular client are passed to the same pod each time, set sessionAffinity to ClientIP. See: https://kubernetes.io/docs/reference/networking/virtual-ips/#session-affinity  |
| jira.service.sessionAffinityConfig | object | `{"clientIP":{"timeoutSeconds":null}}` | Session affinity configuration  |
| jira.service.sessionAffinityConfig.clientIP.timeoutSeconds | string | `nil` | Specifies the seconds of ClientIP type session sticky time. The value must be > 0 && <= 86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800 (for 3 hours).  |
| jira.service.loadBalancerIP | string | `nil` | Use specific loadBalancerIP. Only applies to service type LoadBalancer.  |
| jira.service.contextPath | string | `nil` | The Tomcat context path that Jira will use. The ATL_TOMCAT_CONTEXTPATH will be set automatically.  |
| jira.service.annotations | object | `{}` | Additional annotations to apply to the Service  |
| jira.securityContextEnabled | bool | `true` | Whether to apply security context to pod.  |
| jira.securityContext.fsGroup | int | `2001` | The GID used by the Jira docker image GID will default to 2001 if not supplied and securityContextEnabled is set to true. This is intended to ensure that the shared-home volume is group-writeable by the GID used by the Jira container. However, this doesn't appear to work for NFS volumes due to a K8s bug: https://github.com/kubernetes/examples/issues/260  |
| jira.securityContext.fsGroupChangePolicy | string | `"OnRootMismatch"` | fsGroupChangePolicy defines behavior for changing ownership and permission of the volume before being exposed inside a Pod. This field only applies to volume types that support fsGroup controlled ownership and permissions. https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#configure-volume-permission-and-ownership-change-policy-for-pods  |
| jira.containerSecurityContext | object | `{"allowPrivilegeEscalation":false,"capabilities":{"drop":["ALL"]},"runAsGroup":2001,"runAsNonRoot":true,"runAsUser":2001}` | Standard K8s field that holds security configurations that will be applied to a container. https://kubernetes.io/docs/tasks/configure-pod-container/security-context/  |
| jira.setPermissions | bool | `true` | Boolean to define whether to set local home directory permissions on startup of Jira container. Set to 'false' to disable this behaviour.  |
| jira.ports.http | int | `8080` | The port on which the Jira container listens for HTTP traffic  |
| jira.ports.ehcache | int | `40001` | Ehcache port  |
| jira.ports.ehcacheobject | int | `40011` | Ehcache object port  |
| jira.readinessProbe.enabled | bool | `true` | Whether to apply the readinessProbe check to pod.  |
| jira.readinessProbe.initialDelaySeconds | int | `10` | The initial delay (in seconds) for the Jira container readiness probe, after which the probe will start running.  |
| jira.readinessProbe.periodSeconds | int | `5` | How often (in seconds) the Jira container readiness probe will run  |
| jira.readinessProbe.timeoutSeconds | int | `1` | Number of seconds after which the probe times out  |
| jira.readinessProbe.failureThreshold | int | `10` | The number of consecutive failures of the Jira container readiness probe before the pod fails readiness checks.  |
| jira.readinessProbe.custom | object | `{}` | Custom readiness probe configuration. if custom is {}, defaults to httpGet.  |
| jira.startupProbe.enabled | bool | `true` | Whether to apply the startupProbe check to pod.  |
| jira.startupProbe.initialDelaySeconds | int | `60` | Time to wait before starting the first probe  |
| jira.startupProbe.periodSeconds | int | `5` | How often (in seconds) the Jira container startup probe will run  |
| jira.startupProbe.failureThreshold | int | `120` | The number of consecutive failures of the Jira container startup probe before the pod fails startup checks.  |
| jira.livenessProbe.enabled | bool | `false` | Whether to apply the livenessProbe check to pod.  |
| jira.livenessProbe.initialDelaySeconds | int | `300` | Time to wait before starting the first probe  |
| jira.livenessProbe.periodSeconds | int | `5` | How often (in seconds) the Jira container liveness probe will run  |
| jira.livenessProbe.timeoutSeconds | int | `1` | Number of seconds after which the probe times out  |
| jira.livenessProbe.failureThreshold | int | `12` | The number of consecutive failures of the Jira container liveness probe before the pod fails liveness checks.  |
| jira.livenessProbe.customProbe | object | `{}` | Custom livenessProbe to override the default tcpSocket probe  |
| jira.accessLog.mountPath | string | `"/opt/atlassian/jira/logs"` | The path within the Jira container where the local-home volume should be mounted in order to capture access logs.  |
| jira.accessLog.localHomeSubPath | string | `"log"` | The subdirectory within the local-home volume where access logs should be stored.  |
| jira.s3Storage.avatars.bucketName | string | `nil` | Bucket name to store avatars. If a bucket name and region (see below) are defined, Jira will automatically use AWS S3 to store avatars. Only bucket name is required, not the full arn.  |
| jira.s3Storage.avatars.bucketRegion | string | `nil` | AWS region where the S3 bucket is located.  |
| jira.s3Storage.avatars.endpointOverride | string | `nil` | Override the default AWS API endpoint with a custom one  |
| jira.s3Storage.attachments.bucketName | string | `nil` | Bucket name to store attachments. If a bucket name and region (see below) are defined, Jira will automatically use AWS S3 to store attachments. Only bucket name is required, not the full arn. If you provide the same bucket name for both avatars and attachments, they will be stored in the same bucket  |
| jira.s3Storage.attachments.bucketRegion | string | `nil` | AWS region where the S3 bucket is located.  |
| jira.s3Storage.attachments.endpointOverride | string | `nil` | Override the default AWS API endpoint with a custom one  |
| jira.s3Storage.backups.bucketName | string | `nil` | Bucket name to store backups. If a bucket name and region (see below) are defined, Jira will automatically use AWS S3 to store backups. Only bucket name is required, not the full arn. If you provide the same bucket name for both avatars and backups, they will be stored in the same bucket  |
| jira.s3Storage.backups.bucketRegion | string | `nil` | AWS region where the S3 bucket is located.  |
| jira.s3Storage.backups.endpointOverride | string | `nil` | Override the default AWS API endpoint with a custom one  |
| jira.session.timeout | string | `nil` | User session timeout. Set to 30 minutes in web.xml  |
| jira.session.autologinCookieAge | string | `nil` | The maximum time a user can remain logged-in with 'Remember Me'. Defaults to 1209600; two weeks, in seconds  |
| jira.clustering.enabled | bool | `false` | Set to 'true' if Data Center clustering should be enabled This will automatically configure cluster peer discovery between cluster nodes.  |
| jira.shutdown.terminationGracePeriodSeconds | int | `30` | The termination grace period for pods during shutdown. This should be set to the internal grace period, plus a small buffer to allow the JVM to fully terminate.  |
| jira.shutdown.command | string | `"/shutdown-wait.sh"` | By default pods will be stopped via a [preStop hook](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/), using a script supplied by the Docker image. If any other shutdown behaviour is needed it can be achieved by overriding this value. Note that the shutdown command needs to wait for the application shutdown completely before exiting; see [the default command](https://bitbucket.org/atlassian-docker/docker-atlassian-jira/src/master/shutdown-wait.sh) for details.  |
| jira.postStart | object | `{"command":null}` | PostStart is executed immediately after a container is created. However, there is no guarantee that the hook will execute before the container ENTRYPOINT. See: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks  |
| jira.resources.jvm.maxHeap | string | `"768m"` | The maximum amount of heap memory that will be used by the Jira JVM  |
| jira.resources.jvm.minHeap | string | `"384m"` | The minimum amount of heap memory that will be used by the Jira JVM  |
| jira.resources.jvm.reservedCodeCache | string | `"512m"` | The memory reserved for the Jira JVM code cache  |
| jira.resources.container.requests.cpu | string | `"2"` | Initial CPU request by Jira pod  |
| jira.resources.container.requests.memory | string | `"2G"` | Initial Memory request by Jira pod  |
| jira.forceConfigUpdate | bool | `false` | The Docker entrypoint.py generates application configuration on first start; not all of these files are regenerated on subsequent starts. By default, dbconfig.xml is generated only once. Set `forceConfigUpdate` to true to change this behavior.  |
| jira.additionalJvmArgs[0] | string | `"-Dcom.redhat.fips=false"` |  |
| jira.tomcatConfig | object | `{"acceptCount":"100","accessLogMaxDays":"-1","accessLogPattern":"%a %{jira.request.id}r %{jira.request.username}r %t &quot;%m %U%q %H&quot; %s %b %D &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot; &quot;%{jira.request.assession.id}r&quot;","connectionTimeout":"20000","customServerXml":"","enableLookups":"false","generateByHelm":false,"maxHttpHeaderSize":"8192","maxThreads":"100","mgmtPort":"8005","minSpareThreads":"10","port":"8080","protocol":"HTTP/1.1","proxyName":null,"proxyPort":null,"redirectPort":"8443","requestAttributesEnabled":"false","scheme":null,"secure":null,"stuckThreadDetectionValveThreshold":"120"}` | By default Tomcat's server.xml is generated in the container entrypoint from a template shipped with an official Jira image. However, server.xml generation may fail if container is not run as root, which is a common case if Jira is deployed to OpenShift.  |
| jira.tomcatConfig.generateByHelm | bool | `false` | Mount server.xml as a ConfigMap. Override configuration elements if necessary  |
| jira.tomcatConfig.customServerXml | string | `""` | Custom server.xml to be mounted into /opt/atlassian/jira/conf  |
| jira.seraphConfig | object | `{"autoLoginCookieAge":"1209600","generateByHelm":false}` | By default seraph-config.xml is generated in the container entrypoint from a template shipped with an official Jira image. However, seraph-config.xml generation may fail if container is not run as root, which is a common case if Jira is deployed to OpenShift.  |
| jira.seraphConfig.generateByHelm | bool | `false` | Mount seraph-config.xml as a ConfigMap. Override configuration elements if necessary  |
| jira.additionalLibraries | list | `[]` | Specifies a list of additional Java libraries that should be added to the Jira container. Each item in the list should specify the name of the volume that contains the library, as well as the name of the library file within that volume's root directory. Optionally, a subDirectory field can be included to specify which directory in the volume contains the library file. Additional details: https://atlassian.github.io/data-center-helm-charts/examples/external_libraries/EXTERNAL_LIBS/  |
| jira.additionalBundledPlugins | list | `[]` | Specifies a list of additional Jira plugins that should be added to the Jira container. Note plugins installed via this method will appear as bundled plugins rather than user plugins. These should be specified in the same manner as the 'additionalLibraries' property. Additional details: https://atlassian.github.io/data-center-helm-charts/examples/external_libraries/EXTERNAL_LIBS/  NOTE: only .jar files can be loaded using this approach. OBR's can be extracted (unzipped) to access the associated .jar  An alternative to this method is to install the plugins via "Manage Apps" in the product system administration UI.  |
| jira.additionalVolumeMounts | list | `[{"mountPath":"/opt/atlassian/etc/server.xml.j2","name":"server-xml-j2","subPath":"server.xml.j2"},{"mountPath":"/opt/atlassian/jira/conf/server.xml","name":"server-xml","subPath":"server.xml"},{"mountPath":"/opt/atlassian/jira/atlassian-jira/WEB-INF/classes/templates/plugins/footer/footer.vm","name":"footer-vm","subPath":"footer.vm"}]` | Defines any additional volumes mounts for the Jira container. These can refer to existing volumes, or new volumes can be defined via 'volumes.additional'.  |
| jira.additionalEnvironmentVariables | list | `[]` | Defines any additional environment variables to be passed to the Jira container. See https://hub.docker.com/r/atlassian/jira-software for supported variables.  |
| jira.additionalAnnotations | object | `{}` | Defines additional annotations to the Jira StateFulSet. This might be required when deploying using a GitOps approach |
| jira.additionalPorts | list | `[]` | Defines any additional ports for the Jira container.  |
| jira.additionalVolumeClaimTemplates | list | `[]` | Defines additional volumeClaimTemplates that should be applied to the Jira pod. Note that this will not create any corresponding volume mounts; those needs to be defined in jira.additionalVolumeMounts  |
| jira.topologySpreadConstraints | list | `[]` | Defines topology spread constraints for Jira pods. See details: https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/  |
| jira.additionalCertificates | object | `{"customCmd":null,"initContainer":{"resources":{},"securityContext":{}},"secretList":[],"secretName":null}` | Certificates to be added to Java truststore. Provide reference to a secret that contains the certificates  |
| jira.additionalCertificates.secretName | string | `nil` | Name of the Kubernetes secret with certificates in its data. All secret keys in the secret data will be treated as certificates to be added to Java truststore. If defined, this takes precedence over secretList.  |
| jira.additionalCertificates.secretList | list | `[]` | A list of secrets with their respective keys holding certificates to be added to the Java truststore. It is mandatory to specify which keys from secret data need to be mounted as files to the init container.  |
| jira.additionalCertificates.customCmd | string | `nil` | Custom command to be executed in the init container to import certificates  |
| jira.additionalCertificates.initContainer.resources | object | `{}` | Resources allocated to the import-certs init container  |
| jira.additionalCertificates.initContainer.securityContext | object | `{}` | Custom SecurityContext for the import-certs init container  |
| jira.tunnel | object | `{"additionalConnector":{"URIEncoding":"UTF-8","acceptCount":"10","connectionTimeout":"20000","enableLookups":"false","maxThreads":"50","minSpareThreads":"10","port":null,"secure":false}}` | Configure additional Tomcat connector to set up tunnel. Define the connector port and optional additional attributes. When 'tunnel.additionalConnector.port' is defined, an additional connector is added to server.xml and '-Dsecure.tunnel.upstream.port=<port_number>' is added to JVM args  |
| monitoring.exposeJmxMetrics | bool | `false` | Expose JMX metrics with jmx_exporter https://github.com/prometheus/jmx_exporter  |
| monitoring.jmxExporterInitContainer | object | `{"customSecurityContext":{"runAsUser":1000},"jmxJarLocation":null,"resources":{},"runAsRoot":false}` | JMX exporter init container configuration  |
| monitoring.jmxExporterInitContainer.jmxJarLocation | string | `nil` | The location of the JMX exporter jarfile in the JMX exporter image Leave blank for default bitnami image  |
| monitoring.jmxExporterInitContainer.runAsRoot | bool | `false` | Whether to run JMX exporter init container as root to copy JMX exporter binary to shared home volume. Set to false if running containers as root is not allowed in the cluster.  |
| monitoring.jmxExporterInitContainer.customSecurityContext | object | `{"runAsUser":1000}` | Custom SecurityContext for the jmx exporter init container  |
| monitoring.jmxExporterInitContainer.resources | object | `{}` | Resources requests and limits for the JMX exporter init container See: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/  |
| monitoring.jmxServiceAnnotations | object | `{}` | Annotations added to the jmx service  |
| monitoring.fetchJmxExporterJar | bool | `true` | Fetch jmx_exporter jar from the image. If set to false make sure to manually copy the jar to shared home and provide an absolute path in jmxExporterCustomJarLocation  |
| monitoring.jmxExporterImageRepo | string | `"registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter"` | Image repository with jmx_exporter jar  |
| monitoring.jmxExporterImageTag | string | `"0.18.0"` | Image tag to be used to pull jmxExporterImageRepo  |
| monitoring.jmxExporterPort | int | `9999` | Port number on which metrics will be available  |
| monitoring.jmxExporterPortType | string | `"ClusterIP"` | JMX exporter port type  |
| monitoring.jmxExporterCustomJarLocation | string | `"/var/atlassian/application-data/shared-home/jmx_prometheus_javaagent-0.18.0.jar"` | Location of jmx_exporter jar file if mounted from a secret or manually copied to shared home  |
| monitoring.jmxExporterCustomConfig | object | `{}` | Custom JMX config with the rules  |
| monitoring.serviceMonitor.create | bool | `false` | Create ServiceMonitor to start scraping metrics. ServiceMonitor CRD needs to be created in advance.  |
| monitoring.serviceMonitor.prometheusLabelSelector | object | `{}` | ServiceMonitorSelector of the prometheus instance.  |
| monitoring.serviceMonitor.scrapeIntervalSeconds | int | `30` | Scrape interval for the JMX service.  |
| monitoring.grafana.createDashboards | bool | `false` | Create ConfigMaps with Grafana dashboards  |
| monitoring.grafana.dashboardLabels | object | `{"grafana_dashboard":"1"}` | Label selector for Grafana dashboard importer sidecar  |
| monitoring.grafana.dashboardAnnotations | object | `{}` | Annotations added to Grafana dashboards ConfigMaps. See: https://github.com/kiwigrid/k8s-sidecar#usage  |
| fluentd.enabled | bool | `false` | Set to 'true' if the Fluentd sidecar (DaemonSet) should be added to each pod  |
| fluentd.imageRepo | string | `"ironbank/opensource/fluentd/fluentd-kubernetes-daemonset"` | The Fluentd sidecar image repository  |
| fluentd.imageTag | string | `"1.18.0"` | The Fluentd sidecar image tag  |
| fluentd.resources | object | `{}` | Resources requests and limits for fluentd sidecar container See: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/  |
| fluentd.command | string | `nil` | The command used to start Fluentd. If not supplied the default command will be used: "fluentd -c /fluentd/etc/fluent.conf -v"  Note: The custom command can be free-form, however pay particular attention to the process that should ultimately be left running in the container. This process should be invoked with 'exec' so that signals are appropriately propagated to it, for instance SIGTERM. An example of how such a command may look is: "<command 1> && <command 2> && exec <primary_command>" |
| fluentd.customConfigFile | bool | `false` | Set to 'true' if a custom config (see 'configmap-fluentd.yaml' for default) should be used for Fluentd. If enabled this config must be supplied via the 'fluentdCustomConfig' property below. If your custom config forces fluentd to run in a server mode, add `-Datlassian.logging.cloud.enabled=true` to `jira.AdditionalJvmArgs` stanza in values file  |
| fluentd.fluentdCustomConfig | object | `{}` | Custom fluent.conf file  |
| fluentd.httpPort | int | `9880` | The port on which the Fluentd sidecar will listen  |
| fluentd.elasticsearch.enabled | bool | `true` | Set to 'true' if Fluentd should send all log events to an Elasticsearch service.  |
| fluentd.elasticsearch.hostname | string | `"elasticsearch"` | The hostname of the Elasticsearch service that Fluentd should send logs to.  |
| fluentd.elasticsearch.indexNamePrefix | string | `"jira"` | The prefix of the Elasticsearch index name that will be used  |
| fluentd.extraVolumes | list | `[]` | Specify custom volumes to be added to Fluentd container (e.g. more log sources)  |
| podAnnotations | object | `{}` | Custom annotations that will be applied to all Jira pods  |
| podLabels | object | `{}` | Custom labels that will be applied to all Jira pods  |
| nodeSelector | object | `{}` | Standard K8s node-selectors that will be applied to all Jira pods  |
| tolerations | list | `[]` | Standard K8s tolerations that will be applied to all Jira pods  |
| affinity | object | `{}` | Standard K8s affinities that will be applied to all Jira pods  |
| schedulerName | string | `nil` | Standard K8s schedulerName that will be applied to all Jira pods. Check Kubernetes documentation on how to configure multiple schedulers: https://kubernetes.io/docs/tasks/extend-kubernetes/configure-multiple-schedulers/#specify-schedulers-for-pods  |
| priorityClassName | string | `nil` | Priority class for the application pods. The PriorityClass with this name needs to be available in the cluster. For details see https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass  |
| hostNamespaces | object | `{}` | Share host namespaces which may include hostNetwork, hostIPC, and hostPID  |
| additionalContainers | list | `[]` | Additional container definitions that will be added to all Jira pods  |
| additionalInitContainers | list | `[]` | Additional initContainer definitions that will be added to all Jira pods  |
| additionalLabels | object | `{}` | Additional labels that should be applied to all resources  |
| additionalFiles | list | `[]` | Additional existing ConfigMaps and Secrets not managed by Helm that should be mounted into service container. Configuration details below (camelCase is important!): 'name'      - References existing ConfigMap or secret name. 'type'      - 'configMap' or 'secret' 'key'       - The file name. 'mountPath' - The destination directory in a container. VolumeMount and Volumes are added with this name and index position, for example; custom-config-0, keystore-2  |
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
| additionalHosts | list | `[]` | Additional host aliases for each pod, equivalent to adding them to the /etc/hosts file. https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/ |
| podDisruptionBudget | object | `{"annotations":{},"enabled":false,"labels":{},"maxUnavailable":null,"minAvailable":null}` | PodDisruptionBudget: https://kubernetes.io/docs/tasks/run-application/configure-pdb/ You can specify only one of maxUnavailable and minAvailable in a single PodDisruptionBudget. When both minAvailable and maxUnavailable are set, maxUnavailable takes precedence.  |
| additionalConfigMaps | list | `[]` | Create additional ConfigMaps with given names, keys and content. Ther Helm release name will be used as a prefix for a ConfigMap name, fileName is used as subPath  |
| atlassianAnalyticsAndSupport.analytics.enabled | bool | `true` | Mount ConfigMap with selected Helm chart values as a JSON which DC products will read and send analytics events to Atlassian data pipelines  |
| atlassianAnalyticsAndSupport.helmValues.enabled | bool | `true` | Mount ConfigMap with selected Helm chart values as a YAML file which can be optionally including to support.zip  |
| testPods | object | `{"affinity":{},"annotations":{},"image":{"permissionsTestContainer":"debian:stable-slim","statusTestContainer":"alpine:latest"},"labels":{},"nodeSelector":{},"resources":{},"schedulerName":null,"tolerations":[]}` | Metadata and pod spec for pods started in Helm tests  |
| openshift.runWithRestrictedSCC | bool | `false` | When set to true, the containers will run with a restricted Security Context Constraint (SCC). See: https://docs.openshift.com/container-platform/4.14/authentication/managing-security-context-constraints.html This configuration property unsets pod's SecurityContext, nfs-fixer init container (which runs as root), and mounts server configuration files as ConfigMaps.  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

