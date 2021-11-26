#!/bin/sh
kubectl create namespace shopping

kubectl apply -f ./mongodb/mongodb-sts.yaml -n shopping
kubectl apply -f ./mongodb/mongodb-headless-svc.yaml -n shopping

kubectl exec -ti -n products mongo-0 bash

mongo

rs.initiate({ _id: "MainRepSet", version: 1, 
members: [ 
 { _id: 0, host: "mongod-0.mongodb-service.products.svc.cluster.local:27017" }, 
 { _id: 1, host: "mongod-1.mongodb-service.products.svc.cluster.local:27017" }]});

 rs.status();

db.getSiblingDB("admin").createUser({
    user : "productsdb",
    pwd  : "thisisasecret",
    roles: [ { role: "root", db: "admin" } ]
});