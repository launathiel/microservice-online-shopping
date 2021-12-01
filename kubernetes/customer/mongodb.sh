#!/bin/sh
kubectl create namespace customer
kubectl label ns customer istio-injection=enabled
kubectl apply -n customer -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/customer/mongodb/mongodb-sts.yaml
kubectl apply -n customer -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/customer/mongodb/mongodb-headless-svc.yaml