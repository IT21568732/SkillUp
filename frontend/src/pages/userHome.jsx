import React, { useState, useEffect } from 'react';

const Home = () => {
    // Test data
    const testData = [
        { id: 1, title: "Card 1", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 2, title: "Card 2", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 3, title: "Card 3", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 4, title: "Card 4", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 5, title: "Card 5", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 6, title: "Card 6", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 7, title: "Card 7", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 8, title: "Card 8", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        { id: 9, title: "Card 9", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
        // Add more data as needed
    ];

    // Function to split data into chunks of 3 for rows
    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    // State to hold data split into rows
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData(chunkArray(testData, 3));
    }, []);

    return (
        <div>
            <h1 className="mt-8 mb-4 flex text-5xl text-blue-500 justify-center font-bold  items-center">Courses</h1>
        <section className=" py-10 px-12">        
            <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rowData.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map(post => (
                            <div key={post.id} className="my-3 bg-gray-100 rounded shadow-lg shadow-gray-200  duration-300 hover:-translate-y-1">
                                <a href="./courses" className="cursor-pointer">
                                    <figure>
                                        <figcaption className="p-4">
                                            <p className="text-lg mb-4 font-bold leading-relaxed text-blue-500 ">{post.title}</p>
                                            <small className="leading-5 text-sm text-blue-500 ">{post.description}</small>
                                            
                                        </figcaption>                                        
                                    </figure>
                                </a>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </section>
        </div>
    );
};

export default Home;
