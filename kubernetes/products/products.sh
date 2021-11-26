#!/bin/sh
kubectl apply -f secret.yaml -n customer
kubectl apply -f configmap.yaml -n customer
kubectl apply -f products.yaml -n customer
