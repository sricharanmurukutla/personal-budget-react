import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../index.scss';
import * as d3 from 'd3';

function HomePage() {
  const [budgetData, setBudgetData] = useState([]);
  const [isSecondChartCreated, setIsSecondChartCreated] = useState(false);
  const secondChartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/budget-data')
      .then((res) => {
        setBudgetData(res.data.myBudget);
        createChart(res.data.myBudget);

        if (!isSecondChartCreated) {
          createSecondChart(res.data.myBudget);
          setIsSecondChartCreated(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching budget data:', error);
      });
  }, [isSecondChartCreated]);

  function createChart(data) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.title),
        datasets: [{
          data: data.map(item => item.budget),
          backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            // Add more colors if needed
          ],
        }],
      },
    });
  }

  function createSecondChart(data) {
    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    if (secondChartRef.current) {
      d3.select(secondChartRef.current).selectAll('*').remove();
    }

    const svg = d3.select(secondChartRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.title))
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.budget);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.title))
      .attr("class", "slice");

    const text = svg.selectAll(".labels")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function (d) {
        return d.data.title;
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000)
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);
        pos[0] = radius * 1.002 * (midAngle(d) < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        return midAngle(d) < Math.PI ? "start" : "end";
      });

    const polyline = svg.selectAll(".lines")
      .data(pie(data))
      .enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attr("points", function (d) {
        var pos = outerArc.centroid(d);
        pos[0] = radius * 1 * (midAngle(d) < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), pos];
      });
  }

  return (
    <div className="container center" id="content">
      <div className="page-area">
        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Free</h1>
          <p role="status">
            This app is free!!! And you are the only one holding your data!
          </p>
        </div>

        <div className="graphs_contianer">
          <canvas id="myChart" width="400" height="400"></canvas>

          <div ref={secondChartRef}></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;