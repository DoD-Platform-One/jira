# jira

* git clone https://github.com/stevehipwell/helm-charts.git

* cd helm-charts

* helm dep update charts/jira-software/

* helm template jira charts/jira-software/ -f ../generated/values.yaml > ../generated/generated.yaml


# ECK Integration in JIRA

Pre-requisites

Jira is deployed

ECK/Fluentd is deployed

# Getting Started

1. Login to Kibana
    username: elastic
    Password : <password> 
    Password can be obtained by querying kubectl get secret elasticsearch-es-elastic-user -n elastic -o yaml

2. Create Index by  selecting Management icon from the left menu and  clicking Index patterns under Kibana
    In the Create Index patterns <logstash-*> and click create index pattern.
    In the the next step Click on the dropdown and select "@timestamp"

 3. For Search click on Discovery from the side menu
 
 4. In KQL textbox enter the  field of interest for eg:  "kubernets.namespace.name : jira"
 
 5. Click Refresh/Update
 

NOTE: Default indexpattern is "logstash-*" and this may change in future. Check the available index name 

