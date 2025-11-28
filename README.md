Kubernetes + Docker + CI/CD – Proyecto Arquitectura

Este repositorio contiene el proyecto final de arquitectura basado en una aplicación distribuida con Frontend + Backend + Base de Datos, ejecutada con Docker y desplegada en Kubernetes, con actualización automática mediante push a GitHub (CI/CD).

Repositorio:
https://github.com/dece13/Kubernets-Arqui.git

 Tecnologías utilizadas
Componente	Herramienta
Contenedores	Docker + Dockerfile
Orquestación	Kubernetes (k8s)
Automatización	CI/CD con GitHub
Infraestructura	Namespace + deployments + services
Multi-servicio	Docker Compose
Ejecución local con Docker

Antes de usar Kubernetes, el proyecto puede ejecutarse localmente con contenedores.

▶ Requisitos

Docker Desktop instalado y corriendo

Docker Compose habilitado

▶ Para levantar todos los servicios:
docker-compose up --build


Esto construirá las imágenes desde los Dockerfile, levantará Front, Back y la Base de datos conectados entre sí automáticamente.

 CI/CD con GitHub – Actualización automática de imágenes

Para que las imágenes se actualicen automáticamente:

Estar registrado en GitHub y tener token personal configurado

Realizar push a la rama main

git add .
git commit -m "update"
git push origin main


 Cada push genera nuevas imágenes asociadas al repositorio → disponibles para Kubernetes.

☸ Despliegue en Kubernetes

Una vez generadas las imágenes, se despliega en un entorno con k8s.

▶ Requisitos

Cluster activo (local o remoto)

Namespace creado para el proyecto

Archivos YAML incluidos en este repo

▶ Pasos para desplegar:
# Crear o recrear namespace (si ya existe reinicia ambiente)
kubectl delete namespace app-demo --ignore-not-found=true
kubectl create namespace app-demo

# Aplicar manifiestos de despliegue
kubectl apply -f ./k8s/ -n app-demo


Esto levantará los pods, services y los conectará con las imágenes generadas por GitHub.

 Flujo general del pipeline
Código → Dockerfile → docker-compose → push main → GitHub genera imágenes
↓
Kubernetes pull → namespace desplegado → pods corriendo

 Estado del proyecto

✔ Funcional en Docker Compose
✔ Automatización CI/CD con GitHub
✔ Despliegue en Kubernetes con namespace propio
✔ Infraestructura replicable y escalable

 Autores

Link del video practica: https://youtu.be/fYpqTf-fVl4
Link del video exposición: https://youtu.be/wp42-5yU8bA

Daniel Esteban Castellanos

José Andrés Jaramillo