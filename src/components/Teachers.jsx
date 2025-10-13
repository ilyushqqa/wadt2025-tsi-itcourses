import React from "react";


const teachers = [
{ name: "Alice Johnson", profession: "Frontend Developer", image: "https://randomuser.me/api/portraits/women/1.jpg" },
{ name: "Brian Smith", profession: "UX/UI Designer", image: "https://randomuser.me/api/portraits/men/2.jpg" },
{ name: "Catherine Lee", profession: "React Instructor", image: "https://randomuser.me/api/portraits/women/3.jpg" },
{ name: "Daniel Brown", profession: "JavaScript Expert", image: "https://randomuser.me/api/portraits/men/4.jpg" },
{ name: "Elena Martinez", profession: "Web Design Coach", image: "https://randomuser.me/api/portraits/women/5.jpg" },
{ name: "Frank Miller", profession: "Full-Stack Developer", image: "https://randomuser.me/api/portraits/men/6.jpg" },
{ name: "Grace Taylor", profession: "Project Manager", image: "https://randomuser.me/api/portraits/women/7.jpg" }
];


export default function Teachers() {
return (
<section id="teachers" className="teachers-section">
<div className="container">
<h2 className="teachers-title">Our Teachers</h2>
<div className="teachers-grid">
{teachers.map((teacher, index) => (
<div key={index} className="teacher-card">
<img src={teacher.image} alt={teacher.name} className="teacher-image" />
<h3 className="teacher-name">{teacher.name}</h3>
<p className="teacher-profession">{teacher.profession}</p>
</div>
))}
</div>
</div>
</section>
);
}