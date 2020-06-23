# jira

* git clone https://github.com/stevehipwell/helm-charts.git

* cd helm-charts

* helm dep update charts/jira-software/

* helm template jira charts/jira-software/ -f ../generated/values.yaml > ../generated/generated.yaml
