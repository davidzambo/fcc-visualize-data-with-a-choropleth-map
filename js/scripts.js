const width = 960,
    height = 700,
    source = {};

source.counties = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';
source.education = ' https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';

d3.queue()
    .defer(d3.json, source.counties)
    .defer(d3.json, source.education)
    .await(render);

function render(err, us, education ){
    if (err) throw err;

    d3.select('.container')
        .append('header')
        .append('h1')
        .attr('id', 'title')
        .text('United States Educational Attainment');

    d3.select('header')
        .append('p')
        .attr('id', 'description')
        .text('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)');

    d3.select('.container')
        .append('div')
        .attr('id', 'tooltip');

    const svg = d3.select('.container')
        .append('svg')
        .attr('width', width)
        .attr('height', height );

    const path = d3.geoPath();

    const eduStat = {
        min: d3.min(education, d => d.bachelorsOrHigher),
        max: d3.max(education, d => d.bachelorsOrHigher),
    };

    eduStat.range = d3.range(eduStat.min, eduStat.max, (eduStat.max - eduStat.min) / 8);

    const color = d3.scaleThreshold()
        .domain(eduStat.range)
        .range(d3.schemeGreens[9]);

    const xAxis = d3.scaleLinear()
        .domain([eduStat.min, eduStat.max])
        .range([280, 680]);

    const counties = svg.append('g')
        .attr('transform', 'translate(0,0)');

    counties.selectAll('path')
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', function(d){
            const result = education.filter(ed => ed.fips === d.id);
            return result[0].bachelorsOrHigher || color(0);
        })
        .attr('fill', function(d) {
            const result = education.filter(ed => ed.fips === d.id);
            return color(result[0].bachelorsOrHigher) || color(0);
        })
        .on('mouseenter', function(d){
            const data = education.filter(ed => d.id === ed.fips)[0];
            const e = d3.event;

            d3.select('#tooltip')
                .style('top', e.pageY - 40 + 'px')
                .style('display', 'block')
                .style('visibility', 'visible')
                .attr('data-education', d3.select(this).attr('data-education'))
                .html(`<p>${data.area_name}, ${data.state} - ${data.bachelorsOrHigher}%</p>`);

            const tooltip = d3.select('#tooltip').node().getBoundingClientRect();

            d3.select('#tooltip')
                .style('left', e.pageX - tooltip.width / 2  + 'px');
        })
        .on('mouseleave', function(d){
            d3.select('#tooltip')
                .style('display', 'none')
                .style('visibility', 'hidden');
        });

    const states = svg.append('g').attr('transform', 'translate(0,0)');

    states.selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'states');

    const legend = svg.append('g')
        .attr('id', 'legend');

    legend.selectAll('rect')
        .data(eduStat.range)
        .enter()
        .append('rect')
        .attr('x', (d, i) => 280 + i * 50)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', 10)
        .attr('fill', d => color(d))
        .attr('class', 'legend');

    legend.call(d3.axisBottom(xAxis)
        .tickSize(20)
        .tickFormat(x => Math.floor(x*10)/10 + "%")
        .tickValues(color.domain()))
        .attr('transform', 'translate(250,650)')
        .select('.domain')
        .remove();

    d3.select('.container')
        .append('footer')
        .html('<a href="https://www.dcmf.hu" target="_blank"><span>codedBy</span><img src="https://www.dcmf.hu/images/dcmf-letters.png" alt="dcmf-logo" /></a>');

};