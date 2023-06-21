"use client";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { CardFiles } from "./CardFiles";
import { CardDaysLeft } from "./CardDaysLeft";
import { CardProgress } from "./CardProgress";
import { CardAvatar } from "./CardAvatar";
import Link from "next/link";
import styled from "@emotion/styled";

const StyledTypographyBox = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "wrap",
}));

const Card = ({ card }) => {
  const { caseId, name, type, filesCount, daysLeft, uploadStatus, team } = card;
  const theme = useTheme();
  return (
    <Link href={`/chats/${caseId}`}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          border: "1px solid",
          borderColor: theme.palette.border.main,
          borderRadius: "1rem",
        }}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StyledTypographyBox>
            <Typography variant="body1" color="secondary">
              Case ID #{caseId}
            </Typography>
          </StyledTypographyBox>
          <IconButton
            size="small"
            aria-label="show more"
            aria-controls="main-continer-show-more"
            aria-haspopup="true"
            color="inherit"
          >
            <MoreHorizOutlinedIcon color="icon" />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="body2" color="secondary">
            {name}
          </Typography>

          <Typography
            color="secondary"
            variant="body2"
            fontSize={14}
            fontWeight={200}
          >
            {type}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          mt={1}
        >
          <CardFiles filesCount={filesCount} />
          <CardDaysLeft daysLeft={daysLeft} />
        </Box>
        <CardProgress progress={uploadStatus} />
        <Box mt={2}>
          <CardAvatar avatars={team} />
        </Box>
      </Box>
    </Link>
  );
};

export { Card };
