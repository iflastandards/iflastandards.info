---
title: FRBR Entity-Relationship Model
sidebar: fr_sidebar
permalink: fr/frbr/frbrer.html
uri: "http://iflastandards.info/ns/fr/frbr/frbrer/"
rdf_file: frbrer_en_20200130T182938_3092_0
toc: true
---

## FRBRer Element Set

This is the element set of native RDF classes and properties described in the current text (Feb 2009) of the Functional Requirements for Bibliographic Records (FRBR) entity-relationship model.

## Classes

{% assign rdf = site.data.rdf[page.rdf_file] %}

{% assign classes = rdf | where: "*type", "class" | sort: "*label_en"  %}

<ul>
{% for row in classes %}
  <li>
   <a href="#{{ row["*label_en"] }}">{{ row["*label_en" ] }}</a>
  </li>
{% endfor %}
</ul>

## Properties

{% assign properties = rdf | where: "*type", "property" | sort: "*label_en"  %}

<ul>
{% for row in properties%}
  <li>
   <a href="#{{ row["*label_en"] }}">{{ row["*label_en" ] }}</a>
  </li>
  {% endfor %}
</ul>
{{ page.uri }}

<ul>
{% for row in classes %}
<div id = "{{ row["*label_en" ] }}">
<ul>
  <li>
   <a href="#{{ row["*label_en"] }}">{{ row["*label_en" ] }}</a>
  </li>
  </ul>
  </div>
{% endfor %}

