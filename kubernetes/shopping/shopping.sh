#!/bin/sh
kubectl apply -f secret.yaml -n shopping
kubectl apply -f configmap.yaml -n shopping
kubectl apply -f products.yaml -n shopping