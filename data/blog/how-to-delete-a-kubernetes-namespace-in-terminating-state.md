---
title: How to delete a Kubernetes namespace in Terminating state
date: '2021-08-29'
tags: ['kubernetes']
draft: false
summary: "\"Terminating state\" is caused by resources still existing in the namespace that the namespace controller is unable to remove."
images: []
layout: PostLayout
authors: ['default']
---

In general, Kubernetes namespaces are automatically created by Kubernetes when a new cluster is initialized, but if you want to delete an existing Kubernetes namespace that was not generated with your initial cluster creation, you can do so with this command:

```bash
kubectl delete namespace logging
```

This command should work fine if you don't have any resources inside of the namespace.  However, if you do have Kubernetes resources in the namespace like Deployments or Services and they are currently running, this command will fail.

To delete namespace that has Kubernetes resources already in it, first make sure to bring down all of your Kubernetes objects inside of that namespace with kubectl delete.

To fix this, Kubernetes provides a command to delete the namespace with all of its resources at once.  This is done using:

```bash
kubectl delete all --all -n <namespace_name>
```
The "--all" in front tells Kubernetes to use recursive mode and find any Kubernetes objects inside that are associated with the given namespace.

If by mistake you delete the namespace before deleting the resources, like me, your namespace will get stuck with the message "Terminating state".

This is caused by resources still existing in the namespace that the namespace controller is unable to remove. Kubernetes has a controller that cleans up after non-terminating Kubernetes resources.

To fix this you will have  to remove the finalizer for kubernetes using the cluster API. This would be as simple as:

```bash
kubectl get namespace <namespace_name> -o json > filename.json
```

```json
{
    "apiVersion": "v1",
    "kind": "Namespace",
    "metadata": {
        "creationTimestamp": "2019-05-14T13:55:20Z",
        "labels": {
            "name": "example"
        },
        "name": "example",
        "resourceVersion": "1234123",
        "selfLink": "/api/v1/namespaces/example",
        "uid": "e9316a5a-744f-10b4-5487-0a9a81dda9"
    },
    "spec": {
        "finalizers": [
            "kubernetes"
        ]
    },
    "status": {
        "phase": "Terminating"
    }
}
```

Remove the item `kubernetes` from the `finalizers` array:

```json
{
    "apiVersion": "v1",
    "kind": "Namespace",
    "metadata": {
        "creationTimestamp": "2019-05-14T13:55:20Z",
        "labels": {
            "name": "example"
        },
        "name": "example",
        "resourceVersion": "1234123",
        "selfLink": "/api/v1/namespaces/example",
        "uid": "e9316a5a-744f-10b4-5487-0a9a81dda9"
    },
    "spec": {
        "finalizers": []
    },
    "status": {
        "phase": "Terminating"
    }
}
```

And now commit the file throught the Kubenertes API.

```bash
kubectl replace --raw "/api/v1/namespaces/<namespace_name>/finalize" -f ./filename.json
```

If the command finishes successfully, your namespaces list should no longer include a reference to the namespace. We could use the same technique for changing pods, deployments, services, or whatever else in the Kubernetes enviroment.

I hope it helped you, please let me know in the comments if you have any question.
