<template>
    <div id="test">
        <svg></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
import * as axios from "axios";
export default {
    name:'test',
    props:[''],
    data () {
        return {
            dataset:null
        };
    },
    computed: {

    },
    mounted() {
        axios.get('http://localhost:3000/test').then((res)=>{
            this.dataset = res.data;
            this.init(this.dataset)
        })
    },
    methods: {
        init(data){
            function clicked(event, p) {
                parent.datum(p.parent || root);

                root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
                });

                const t = g.transition().duration(750);

                // Transition the data on all arcs, even the ones that aren’t visible,
                // so that if this transition is interrupted, entering arcs will start
                // the next transition from the desired position.
                path.transition(t)
                    .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                    })
                .filter(function(d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                    .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                    .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 

                    .attrTween("d", d => () => arc(d.current));

                label.filter(function(d) {
                    return +this.getAttribute("fill-opacity") || labelVisible(d.target);
                }).transition(t)
                    .attr("fill-opacity", d => +labelVisible(d.target))
                    .attrTween("transform", d => () => labelTransform(d.current));
            }
            
            function arcVisible(d) {
                return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
            }

            function labelVisible(d) {
                return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
            }

            function labelTransform(d) {
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = (d.y0 + d.y1) / 2 * radius;
                return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            }

            let arc = d3.arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius * 1.5)
                .innerRadius(d => d.y0 * radius)
                .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
            let partition = data => {
                    /*
                        d3.hierarchy(data[, children])
                        从指定的分层数据构造一个根节点。指定的数据必须是表示根节点的对象。
                    */
                    const root = d3.hierarchy(data)
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value);
                    // d3.partition
                    // 使用默认设置创建新的分区布局
                    // 布置指定的根层次结构，在根及其后代上分配以下属性node.x0，node.y0，node.x1，node.y1
                    // 在将层次结构传递给分区布局之前，您必须调用root.sum 。您可能还想调用root.sort在计算布局之前对层次结构进行排序。
                    return d3.partition()
                        .size([2 * Math.PI, root.height + 1])
                        (root);
                    };
            
            const root = partition(data);
            root.each(d => d.current = d);
            console.log(root)
            let relationChart = document.getElementById("test");
            let width = relationChart.offsetWidth;
            let height = relationChart.offsetHeight;
            let radius = width / 6;
            let format = d3.format(",d")
            let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

            // 创建分离的svg
            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, width])
                .style("font", "10px sans-serif");
            
            let g = svg.append("g")
                .attr("transform", `translate(${width / 2},${width / 2})`);
            /* 
                root.descendants() 返回一个扁平的数组来表达root的子孙后代
            */
            let path = g.append("g")
                .selectAll("path")
                .data(root.descendants().slice(1))
                .join("path")
                .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
                .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
                .attr("d", d => {
                    return arc(d.current)
                });

            path.filter(d => d.children)
                .style("cursor", "pointer")
                .on("click", clicked);

            path.append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
            
            const label = g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1))
                .join("text")
                .attr("dy", "0.35em")
                .attr("fill-opacity", d => +labelVisible(d.current))
                .attr("transform", d => labelTransform(d.current))
                .text(d => d.data.name);

            const parent = g.append("circle")
                .datum(root)
                .attr("r", radius)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("click", clicked);
            // 将分离的svg添加到dom中
            d3.select("#test").append(()=>svg.node())
        },
    },
    watch: {}

}

</script>

<style>
#test{
    height: 1000px;
    width: 700px;
}
</style>