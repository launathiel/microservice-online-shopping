# Microservice Online Shopping
built using express js, message broker by rabbitmq and containerized by docker.

## To run Using Docker Compose
```bash
docker-compose -f docker.comose.yml up -d
```
## To run on Kubernetes Cluster
### Setup Rabbitmq Cluster
```bash
chown +x ./kubernetes/rabbitmq/rabbitmq.sh # make file executable
./kubernetes/rabbitmq/rabbitmq.sh # run shell file
```
#### Check all rabbitmq component
```bash
kubectl get all -o wide -n rabbitmq-system
kubectl get all -o wide -n rabbitmq
```
### Run **Customer** Service
#### Make file executable
```bash
chown +x ./kubernetes/customer/mongodb.sh
chown +x ./kubernetes/customer/customer.sh
```
#### Deploy customer database
```bash
./kubernetes/customer/mongodb.sh 
```
#### Deploy customer service
```bash
./kubernetes/customer/customer.sh 
```

### Run **Products** Service
#### Make file executable
```bash
chown +x ./kubernetes/products/mongodb.sh
chown +x ./kubernetes/products/products.sh
```
#### Deploy products database
```bash
./kubernetes/products/mongodb.sh 
```
#### Deploy products service
```bash
./kubernetes/products/products.sh 
```

### Run **Shopping** Service
#### Make file executable
```bash
chown +x ./kubernetes/shopping/mongodb.sh
chown +x ./kubernetes/shopping/shopping.sh
```
#### Deploy customer database
```bash
./kubernetes/shopping/shopping.sh 
```
#### Deploy customer service
```bash
./kubernetes/shopping/shopping.sh 
```