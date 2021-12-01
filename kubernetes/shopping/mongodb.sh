#!/bin/sh
kubectl create namespace shopping
kubectl label ns shopping istio-injection=enabled
kubectl apply -n shopping -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/shopping/mongodb/mongodb-sts.yaml
kubectl apply -n shopping -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/shopping/mongodb/mongodb-headless-svc.yaml