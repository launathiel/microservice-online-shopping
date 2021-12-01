#!/bin/sh

kubectl create namespace products
kubectl label ns products istio-injection=enabled
kubectl apply -n products -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/products/mongodb/mongodb-sts.yaml
kubectl apply -n products -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/products/mongodb/mongodb-headless-svc.yaml