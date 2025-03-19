import { useState, Fragment } from "react";
import {
  Card as MuiCard,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Collapse,
} from "@mui/material";
import "./orgNode.css";
import {
  ExpandMore,
  NavigateNext,
  ArrowBackIosNew,
  ExpandLess,
  BusinessCenter,
  LocationOn,
  MoreHoriz,
} from "@mui/icons-material";

const Card = (props) => {
  const { data, expandAll, layout } = props;
  const [expanded, setExpanded] = useState({});
  const [descriptionExpanded, setDescriptionExpanded] = useState({});

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDescriptionExpandClick = (id) => {
    setDescriptionExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul>
      {data.map((item) => (
        <Fragment key={item.id}>
          <li>
            <MuiCard
              elevation={3}
              className={`card ${layout === "horizontal" ? "card-flex" : ""}`}
            >
              <CardContent
                className={layout === "horizontal" ? "card-content" : ""}
              >
                <Avatar
                  alt={item.name}
                  src={item.imageUrl}
                  className="avatar"
                />
                <Typography variant="h6" className="name">
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="title"
                >
                  <BusinessCenter
                    color="error"
                    fontSize="small"
                    sx={{ m: "10px 2px" }}
                  />{" "}
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="region"
                >
                  <LocationOn fontSize="small" color="primary" /> {item.region}
                </Typography>

                {item.description && (
                  <Box
                    sx={{ width: "100%", height: "auto", mt: "5px", py: "8px" }}
                  >
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleDescriptionExpandClick(item.id)}
                    >
                      <MoreHoriz />
                    </IconButton>
                    <Collapse
                      in={descriptionExpanded[item.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="description"
                      >
                        {item.description}
                      </Typography>
                    </Collapse>
                  </Box>
                )}
                {item.children && (
                  <IconButton
                    size="small"
                    onClick={() => handleExpandClick(item.id)}
                  >
                    {layout === "horizontal" ? (
                      expanded[item.id] ? (
                        <ArrowBackIosNew />
                      ) : (
                        <NavigateNext />
                      )
                    ) : expanded[item.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                )}
              </CardContent>
            </MuiCard>

            {(expanded[item.id] || expandAll) && item.children && (
              <Card
                data={item.children}
                expandAll={expandAll}
                layout={layout}
              />
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const OrgNode = ({ data, expand, layout }) => {
  return (
    <div
      className={`org-tree ${layout === "horizontal" ? "horizontal-tree" : ""}`}
    >
      {data.map((item) => (
        <div key={item.id} className="org-root">
          <Card data={[item]} expandAll={expand} layout={layout} />
        </div>
      ))}
    </div>
  );
};

export default OrgNode;
