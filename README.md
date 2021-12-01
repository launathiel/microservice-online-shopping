# Microservice Online Shopping
built using express js, message broker by rabbitmq and containerized by docker. now in progess to implement with service mesh paradigm in kubernetes cluster
### **Clone Repository** 
```bash
git clone https://github.com/launathiel/microservice-online-shopping

cd microservice-online-shopping
```
## Run Using Docker Compose
```bash
docker-compose -f docker.comose.yml up -d
```
---
## Run on Kubernetes Cluster ( with Istio & RabbitMQ )
### Setup Istio
#### Download istio
```bash
curl -L https://istio.io/downloadIstio | sh -
```
#### Make file executable
```bash
chmod +x ./kubernetes/istio/istio-init.sh
```
#### execute sh file
```bash
./kubernetes/istio/istio-init.sh
```
#### check if istio successfully deployed
```bash
kubectl get all -n istio-system
```
---
### Setup Rabbitmq Cluster
#### Make file executable
```bash
chmod +x ./kubernetes/rabbitmq/rabbitmq.sh
```
#### execute sh file
```bash
./kubernetes/rabbitmq/rabbitmq.sh
```
#### Check all rabbitmq component
```bash
kubectl get all -o wide -n rabbitmq-system
kubectl get all -o wide -n rabbitmq
```
---
### Run **Customer** Service
#### Make file executable
```bash
chmod +x ./kubernetes/customer/mongodb.sh
chmod +x ./kubernetes/customer/customer.sh
```
#### Deploy customer database
```bash
./kubernetes/customer/mongodb.sh 
```
#### MongoDB init ( First Time Only )
```bash
kubectl exec -ti -n customer mongod-customer-0 bash

# initiate replicaset
mongo --quiet <<EOF
rs.initiate({ 
    _id : "MainRepSet", 
    version : 1, 
    members: [
        { _id: 0, host: "mongod-customer-0.mongodb-service.customer.svc.cluster.local:27017" }, 
        { _id: 1, host: "mongod-customer-1.mongodb-service.customer.svc.cluster.local:27017" }
    ]
});
EOF
# you can specify member of replicaset depend on your mongoDB sts' replica

# check 
mongo --eval 'rs.status();'

# create user admin
mongo --quiet <<EOF
db.getSiblingDB("admin").createUser({
    user : "customerdb",
    pwd  : "thisisasecret",
    roles: [ { role: "root", db: "admin" } ]
});
EOF

exit
```
#### Deploy customer service
```bash
./kubernetes/customer/customer.sh 
```
---
### Run **Products** Service
#### Make file executable
```bash
chmod +x ./kubernetes/products/mongodb.sh
chmod +x ./kubernetes/products/products.sh
```
#### Deploy products database
```bash
./kubernetes/products/mongodb.sh 
```
#### MongoDB init ( First Time Only )
```bash
kubectl exec -ti -n products mongod-products-0 bash

# initiate replicaset
mongo --quiet <<EOF
rs.initiate({ 
    _id : "MainRepSet", 
    version : 1, 
    members: [
        { _id: 0, host: "mongod-products-0.mongodb-service.products.svc.cluster.local:27017" }, 
        { _id: 1, host: "mongod-products-1.mongodb-service.products.svc.cluster.local:27017" }
    ]
});
EOF
# you can specify member of replicaset depend on your mongoDB sts' replica

# check 
mongo --eval 'rs.status();'

# create user admin
mongo --quiet <<EOF
db.getSiblingDB("admin").createUser({
    user : "productsdb",
    pwd  : "thisisasecret",
    roles: [ { role: "root", db: "admin" } ]
});
EOF

exit
```
#### Deploy products service
```bash
./kubernetes/products/products.sh 
```
---
### Run **Shopping** Service
#### Make file executable
```bash
chmod +x ./kubernetes/shopping/mongodb.sh
chmod +x ./kubernetes/shopping/shopping.sh
```
#### Deploy shopping database
```bash
./kubernetes/shopping/shopping.sh 
```
#### MongoDB init ( First Time Only )
```bash
kubectl exec -ti -n products mongod-shopping-0 bash

# initiate replicaset
mongo --quiet <<EOF
rs.initiate({ 
    _id : "MainRepSet", 
    version : 1, 
    members: [
        { _id: 0, host: "mongod-shopping-0.mongodb-service.shopping.svc.cluster.local:27017" }, 
        { _id: 1, host: "mongod-shopping-1.mongodb-service.shopping.svc.cluster.local:27017" }
    ]
});
EOF
# you can specify member of replicaset depend on your mongoDB sts' replica

# check 
mongo --eval 'rs.status();'

# create user admin
mongo --quiet <<EOF
db.getSiblingDB("admin").createUser({
    user : "shoppingdb",
    pwd  : "thisisasecret",
    roles: [ { role: "root", db: "admin" } ]
});
EOF

exit
```
#### Deploy shopping service
```bash
./kubernetes/shopping/shopping.sh 
```

## Service Mesh Monitoring
### Prometheus
### Grafana
### Kiali