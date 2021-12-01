#!/bin/sh
kubectl apply -n customer -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/customer/secret.yaml
kubectl apply -n customer -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/customer/configmap.yaml
kubectl apply -n customer -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/customer/customer.yaml
