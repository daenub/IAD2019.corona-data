# Analyse corona-data.ch

## Was fällt ihnen auf?

Beim Betrachten der Plattform fällt auf, dass quasi keine respektive eine schwache Hierarchie vorhanden ist.
Alle dargestellten Charts sind einander visuell gleichgestellt. Es fällt schwer, eine zu- oder überordnung zu machen.
Speziell fällt dies bei der Karte «Heutige Daten» auf. Einen Klick auf einen Kanton, wie auch die Auswahl der Kenngrössen filtert auch die Daten der nachfolgenden Darstellungen. Dies ist aber sehr schlecht nachvollziehbar.

Auf den ersten Blick wird die betrachtende Person mit einer riesigen Menge an Daten überflutet. Der User wird nicht durch die Datenwüste geführt. Auch auf der Grund der oben genannten schwachen Hierarchie wird es dem User erschwert, die Daten in zusammenhang zu bringen und Wissen daraus zu ziehen.

Viele der Visualisierungen sind komplex und wurden in einer Form dargestellt, welche für viele Personen nicht natürlich und demnach schwer zu verstehen sind. Sie enthalten wenige bis zu keine Hinweise zu den Daten.
Ausserdem wäre ein Glossar hilfreich, da gewisse Begriffe wie z.B. Stringenz nicht bekannt sind.

## Informationsarchitektur

Bei der Visualisierung «Heutige Daten» werden die Fallzahlen auf die geografische Darstellung der Kantone gemappt.
Dabei repräsentiert die Farbe des Kantons auf der Karte die Fallzahlen auf einer Farbskala.

| Feld                  | Beschreibung             |
| --------------------- | ------------------------ |
| Kanton                | Geografische Information |
| Fälle Heute           | Zahl                     |
| Fälle Gestern         | Zahl                     |
| Fälle vor einer Woche | Zahl                     |

Die gescrapten Daten werden z.B. in folgendem Format gespeichert:

| Datum      | AG      | AI     | AR      | …   |
| ---------- | ------- | ------ | ------- | --- |
| 2021-11-09 | 61871.0 | 2033.0 | 84946.0 | …   |
| 2021-11-10 | 62101.0 | 2047.0 | 85307.0 | …   |

## Änderungsvorschläge

### Hierarchie und Zugehörigkeit

Um die zugehörigkeit von Visualisierungen besser zu visualisieren sollten klare Sektionen definiert werden. Das «Law of Proximity» besagt, dass Elemente welche nahe beieinander sind auch eine Bezug zueinander haben. Ebenso werden Elemente, welche eine grössere Distanz haben, so wahrgenommen, dass sie keinen Bezug zueinander haben.

Eine einfache Lösung wäre, die Visualisierungen in klare Region zu bündeln, welche gegenseitig mit genügend Weissraum abgetrennt sind. Somit sind auch weniger Informationen auf einmal sichtbar.

[What Is the Law of Proximity? • interaction-design.org • Aufgerufen am 12.11.2021](https://www.interaction-design.org/literature/article/laws-of-proximity-uniform-connectedness-and-continuation-gestalt-principles-2)

### Too much information

Wenn die Menge an Informationen auf dem Dashboard reduziert wird, werden diese noch vorhandenen Informationen besser verständlich und konsumierbar.
Auf dem ersten sichtbaren Bereich oder allgmein auf der Startseite könnten die Daten stärker zusammengefasst werden um einen besseren Überblick zu verschaffen.
Falls dann User gewisse Daten aufboren möchten sollten sie diese Möglichkeit auf Detailseiten oder in separaten Regionen tun können.

[Arranging Your Charts as a Dashboard • dataschool.com • Aufgerufen am 12.11.2021](https://dataschool.com/how-to-design-a-dashboard/arranging-your-charts-as-a-dashboard/#avoid-too-much-information-tmi)

### Lesbarkeit

Alle Inhalte laufen momentan über die ganze Breite des Browserfensters. Dies führt bei den Texten zu sehr langen Zeilenbreite und somit zu einer schlechten Lesbarkeit.
Die Lesbarkeit kann sehr einfach optimiert werden, indem eine maximale Breite für die Absätze definiert wird.

[line length • practicaltypography.com • Aufgerufen am 12.11.2021](https://practicaltypography.com/line-length.html)

## Neue Visualisierung

Auf dem Portal werden bereits die Übersterblichkeit und der Human Development Index für unterschiedliche Visualisierungen verwendet. Ich habe nun die beiden Datensätze verwendet um aufzuzeigen ob Länder mit einem höheren Wohlstandsindikator auch weniger stark unter Corona gelitten haben.

Die Übersterblichkeitsrate ist aber [mit Vorsicht zu geniessen](https://github.com/owid/covid-19-data/tree/master/public/data/excess_mortality#important-points-about-the-data), da gerade in ärmeren Ländern eine relativ hohe Prozentzahl an Todesfällen nicht erfasst wird.

![Scatter Plot HDI / Excess Mortality](/chart/scatter-plot.png)
