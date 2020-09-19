


# Plot.ly Homework - Belly Button Biodiversity


Launch [Webpage](https://thawk18.github.io/BellyButton-Biodiversity/) (not working at the moment for a last minute error)

All images are pre-set examples, some colours were personalised

In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. d3 was used to read `samples.json`.

2. I created horizontal bar chart with a dropdown menu to display the first 10 OTUs found in that individual.

Extracted `sample_values` as the values for the bar chart,  `otu_ids` as the labels for the bar chart, `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

* Extracted `otu_ids` for the x values and `sample_values` for the y values.

* Used `sample_values` for the marker size, `otu_ids` for the marker colors, `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Extracted sample metadata, i.e., an individual's demographic informatio and displayed each key-value pair from the metadata JSON object.

![hw](Images/hw03.png)

5. Plots updated everytime a dataset is selected


## Advanced Challenge Assignment (Optional)
* the Gauge Chart was adapted to plot the weekly washing frequency of the individual.

![Weekly Washing Frequency Gauge](Images/gauge.png)

