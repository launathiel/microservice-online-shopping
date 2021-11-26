#!/bin/sh
kubectl create namespace customer

kubectl apply -f ./mongodb/mongodb-sts.yaml -n customer
kubectl apply -f ./mongodb/mongodb-headless-svc.yaml -n customer

kubectl exec -ti -n customer mongo-0 bash

mongo

rs.initiate({ _id: "MainRepSet", version: 1, 
members: [ 
 { _id: 0, host: "mongod-0.mongodb-service.customer.svc.cluster.local:27017" }, 
 { _id: 1, host: "mongod-1.mongodb-service.customer.svc.cluster.local:27017" }]});

 rs.status();

db.getSiblingDB("admin").createUser({
    user : "customerdb",
    pwd  : "thisisasecret",
    roles: [ { role: "root", db: "admin" } ]
});