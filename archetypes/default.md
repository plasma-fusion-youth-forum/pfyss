---
title: {{ replace .File.ContentBaseName "-" " " | title }}
date: {{ .Date }}
draft: false
description: {{ .Site.Params.description }}
---
