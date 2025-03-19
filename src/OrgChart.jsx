import { useRef, useState, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  ThemeProvider,
  Box,
  MenuItem,
  IconButton,
  Menu,
  createTheme,
  Typography,
  Paper,
} from "@mui/material";
import { downloadAsImage, downloadAsPDF } from "./Components/common/utils.jsx";
import OrgNode from "./Components/orgNode/OrgNode.jsx";
import {
  HorizontalRule,
  Image,
  MoreVert,
  PictureAsPdf,
  UnfoldLess,
  UnfoldMore,
  VerticalAlignTop,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import "./OrgChart.css";

const OrgChart = ({ nodeData, fontValues, height, width }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [layout, setLayout] = useState("vertical");
  const [expand, setExpand] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);

  const Fonttheme = createTheme({
    typography: {
      //   fontFamily: `${fontValues.fontFamily ? fontValues.fontFamily : "Montserrat,Inter, Poppins, Arial, sans-serif"}`,
      fontFamily:
        fontValues?.fontFamily ||
        "Montserrat, Poppins, Inter, Arial, sans-serif",
    },
  });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setHoveredAction(null);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest(".action-controls") === null) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setTranslate({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale - e.deltaY * 0.01;
    setScale(Math.min(Math.max(newScale, 0.1), 3));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [scale]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseUp);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isPanning, startPan]);

  const zoomIn = (e) => {
    e.stopPropagation();
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  const toggleFullScreen = async (e) => {
    e.stopPropagation();
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const changeLayout = (newLayout, event) => {
    if (event) {
      event.stopPropagation();
    }
    setLayout(newLayout);
    handleClose();
  };

  const toggleExpandAll = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setExpand((prev) => !prev);
    handleClose();
  };

  const handleActionClick = (action, event) => {
    event.stopPropagation();
    action.onClick(event);
  };

  const actions = [
    {
      label: "Horizontal Layout",
      icon: <HorizontalRule />,
      onClick: (e) => changeLayout("horizontal", e),
    },
    {
      label: "Vertical Layout",
      icon: <VerticalAlignTop />,
      onClick: (e) => changeLayout("vertical", e),
    },
    {
      label: expand ? "Collapse All" : "Expand All",
      icon: expand ? <UnfoldLess /> : <UnfoldMore />,
      onClick: (e) => toggleExpandAll(e),
    },
    {
      label: "Download as Image",
      icon: <Image />,
      onClick: (e) => {
        downloadAsImage(containerRef);
        handleClose(e);
      },
    },
    {
      label: "Download as PDF",
      icon: <PictureAsPdf />,
      onClick: (e) => {
        downloadAsPDF(containerRef);
        handleClose(e);
      },
    },
  ];

  const FullscreenActions = () => (
    <Box
      className="action-controls"
      sx={{
        position: "absolute",
        top: "16px",
        left: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1000,
      }}
    >
      {actions.map((action, index) => (
        <Paper
          key={index}
          onMouseEnter={() => setHoveredAction(index)}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={(e) => handleActionClick(action, e)}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50px",
            overflow: "hidden",
            transition: "all 0.2s ease-in-out",
            width: hoveredAction === index ? "200px" : "40px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "rgba(245, 245, 245, 0.95)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              width: "200px",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "action.active",
              flexShrink: 0,
            }}
          >
            {action.icon}
          </Box>
          <Typography
            variant="body2"
            sx={{
              pr: 2,
              opacity: hoveredAction === index ? 1 : 0,
              maxWidth: hoveredAction === index ? "160px" : "0",
              transition: "all 0.2s ease-in-out",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {action.label}
          </Typography>
        </Paper>
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={Fonttheme}>
      <Box
        ref={containerRef}
        sx={{
          border: "2px solid hsl(0,0%,80%)",
          height: height ?? "600px",
          width: width ?? "100%",
          overflow: "hidden",
          position: "relative",
          background: "white",
          cursor: isPanning ? "grabbing" : "grab",
          backgroundImage:
            "radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        style={{ "--primary-color": fontValues?.fontColor || "" }}
      >
        {nodeData && nodeData.length > 0 ? (
          <Box
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transformOrigin: "0 0",
              transition: isPanning ? "none" : "transform 0.1s ease",
            }}
          >
            <OrgNode data={nodeData} expand={expand} layout={layout} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No data found
            </Typography>
          </Box>
        )}

        <Box
          className="action-controls"
          sx={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            zIndex: 1000,
          }}
        >
          <ButtonGroup
            orientation="vertical"
            variant="filled"
            aria-label="zoom and fullscreen buttons"
          >
            <Button onClick={zoomIn} startIcon={<ZoomIn />} />
            <Button onClick={zoomOut} startIcon={<ZoomOut />} />
            <Button
              onClick={toggleFullScreen}
              startIcon={isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            />
          </ButtonGroup>
        </Box>

        {isFullscreen ? (
          <FullscreenActions />
        ) : (
          <Box
            className="action-controls"
            sx={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 1000,
            }}
          >
            <IconButton
              aria-controls="view-options-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="view-options-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={(e) => e.stopPropagation()}
            >
              {actions.map((action, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => handleActionClick(action, e)}
                  sx={{
                    padding: "10px 16px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <Box sx={{ marginRight: "10px" }}>{action.icon}</Box>
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default OrgChart;
