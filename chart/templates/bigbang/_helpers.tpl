{{/*
Selector labels for Jira resources
*/}}
{{- define "jira.selectorLabels" -}}
app.kubernetes.io/name: {{ include "common.names.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}