# Kubernetes - project

---

An example kubernetes configuration providing functioning (adding names to the database) and communication of the following elements:
* `React` _(built and ran `nginx`)_
* `Express`
* `MongoDB`
* `Redis`

---

The `Ingress` service, which needs a controller to work properly (in this case [`ingress-nginx`](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop)), provides communication with the whole system.

It listens on port _80_ and forwards requests inside the cluster into the `nginx` responsible for the frontend (port _80_) or the backend (port _5000_).

Each application is available inside the cluster thanks to the `ClusterIP` service.

---

The applications are configured by environmental variables, originating from config maps and passed during deployment.

---

Both frontend and backend are set to _2_ replicas, in order to maintain functioning of the application in case of any errors / waiting for pod's restart. Moreover, each pod is relieved, thanks to traffic balancing.

The `MongoDB` database additionally persists data thanks to `PersistentVolumeClaim`, which uses resources reserved by `PersistentVolume`.