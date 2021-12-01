#!/bin/sh
kubectl apply -n shopping -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/shopping/secret.yaml
kubectl apply -n shopping -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/shopping/configmap.yaml
kubectl apply -n shopping -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/shopping/shopping.yaml