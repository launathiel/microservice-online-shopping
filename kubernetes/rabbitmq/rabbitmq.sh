#!/bin/sh

kubectl apply -f https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml
kubectl create ns rabbitmq
kubectl label ns rabbitmq istio-injection=enabled
kubectl apply -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/rabbitmq/rabbitmq-manifest.yaml
kubectl apply -f https://raw.githubusercontent.com/launathiel/microservice-online-shopping/main/kubernetes/rabbitmq/headless-service.yaml