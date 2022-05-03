helm install rabbitmq bitnami/rabbitmq -n rabbitmq \
--set auth.username=admin,auth.password=secretpassword,auth.erlangCookie=secretcookie \
--set replicaCount=3