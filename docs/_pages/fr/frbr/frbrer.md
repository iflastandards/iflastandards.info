---
title: FRBR Entity-Relationship Model
sidebar: fr_sidebar
permalink: fr/frbr/frbrer.html
uri: "http://iflastandards.info/ns/fr/frbr/frbrer/"
jsonld: "frbr_frbrer"
ns: "fr"
toc: true
---

## FRBRer Element Set

This is the element set of native RDF classes and properties described in the current text (Feb 2009) of the Functional Requirements for Bibliographic Records (FRBR) entity-relationship model.

## Classes

{% assign graph = site.data.rdf.elements[page.ns][page.jsonld]["@graph"] %}
{% assign language = 'en' %}

{% assign classes = graph | where: "@type", "Class" %}
{% assign class_labels = classes | map: 'label'| sort: language | map: language %}

{% assign properties = graph | where: "@type", "Property" %}
{% assign property_labels = properties | map: 'label'| sort: language | map: language %}

<ul>
{% for label in class_labels %}
  <li>
   <a href="#{{ label }}">{{ label }}</a>
  </li>
{% endfor %}
</ul>

## Properties

<ul>
{% for label in property_labels%}
  <li>
   <a href="#{{ label }}">{{ label }}</a>
  </li>
  {% endfor %}
</ul>
{{ page.uri }}
