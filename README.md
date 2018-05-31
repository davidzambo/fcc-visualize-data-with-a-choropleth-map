# fcc-visualize-data-with-a-choropleth-map

(You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. Required (non-virtual) DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.)

#### User Stories
  - My choropleth should have a title with a corresponding id="title".
  - My choropleth should have a description element with a corresponding id="description".
  - My choropleth should have counties with a corresponding class="county" that represent the data.
  - There should be at least 4 different fill colors used for the counties.
  - My counties should each have data-fips and data-education properties containing their corresponding fips and education values.
  - My choropleth should have a county for each provided data point.
  - The counties should have data-fips and data-education values that match the sample data.
  - My choropleth should have a legend with a corresponding id="legend".
  - There should be at least 4 different fill colors used for the legend.
  - I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
  - My tooltip should have a data-education property that corresponds to the data-education of the active area.
    
Here are the datasets you will need to complete this project:
    US Education Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json
    US County Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json
    You can build your project by forking this CodePen pen. Or you can use this CDN link to run the tests in any environment you like: https://gitcdn.link/repo/freeCodeCamp/testable-projects-fcc/master/build/bundle.js
    
