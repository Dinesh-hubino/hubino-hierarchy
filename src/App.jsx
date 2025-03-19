import OrgChart from "./OrgChart";
import { Box } from "@mui/material";
import { dataSet } from "./data/sampleData";

function App() {
  // const sampleData = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     title: "CTO",
  //     description:
  //       "Chief Technology Officer with 10+ years of experience in leading tech teams.",
  //     region: "USA",
  //     status: "NORM",
  //     imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  //     children: [
  //       {
  //         id: "1.1",
  //         name: "Jane Smith",
  //         title: "Software Engineer",
  //         description:
  //           "Full-stack developer specializing in web technologies and cloud infrastructure.",
  //         region: "Canada",
  //         status: "NORM",
  //         imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  //         children: [
  //           {
  //             id: "1.1.1",
  //             name: "Michael Johnson",
  //             title: "Junior Developer",
  //             description:
  //               "Frontend developer focusing on React and UI development.",
  //             region: "Canada",
  //             status: "WARN",
  //             imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
  //           },
  //           {
  //             id: "1.1.2",
  //             name: "Emily Davis",
  //             title: "QA Engineer",
  //             description:
  //               "Ensures software quality through testing and process optimization.",
  //             region: "Canada",
  //             status: "NORM",
  //             imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
  //           },
  //         ],
  //       },
  //       {
  //         id: "1.2",
  //         name: "Daniel Garcia",
  //         title: "DevOps Engineer",
  //         description:
  //           "Manages cloud infrastructure and deployment pipelines and has Foundational skills.",
  //         region: "USA",
  //         status: "CRIT",
  //         imageUrl: "https://randomuser.me/api/portraits/men/90.jpg",
  //         children: [
  //           {
  //             id: "1.2.1",
  //             name: "Sophia Martinez",
  //             title: "Infrastructure Engineer",
  //             description:
  //               "Specializes in server management and cloud services.",
  //             region: "USA",
  //             status: "NORM",
  //             imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
  //           },
  //           {
  //             id: "1.2.2",
  //             name: "Ethan Williams",
  //             title: "Cloud Architect",
  //             description:
  //               "Designs and implements cloud solutions for scalability.",
  //             region: "USA",
  //             status: "NORM",
  //             imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const fontValues = {
    // fontFamily: "sans-serif",
    // fontColor: "red",
  };

  return (
    <>
      {/* <Typography variant="h4">Hubino-Chart</Typography> */}
      <Box
        sx={{
          margin: "auto",
          // width: "60%",
          // height:"400px",
        }}
      >
        <OrgChart
          nodeData={dataSet}
          fontValues={fontValues}
          height={"800px"}
          width={"100%"}
        />
      </Box>
    </>
  );
}

export default App;
