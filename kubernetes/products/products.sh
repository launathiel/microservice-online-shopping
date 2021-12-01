#!/bin/sh
kubectl apply -n -f products https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/products/secret.yaml
kubectl apply -n products -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/products/configmap.yaml
kubectl apply -n products -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/products/products.yaml
