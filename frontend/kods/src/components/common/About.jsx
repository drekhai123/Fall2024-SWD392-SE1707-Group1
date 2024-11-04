import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  // CardMedia,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Star as StarIcon } from '@mui/icons-material';

const teamMembers = [
  { name: 'Đoàn Tuấn Khải', role: 'Backend Engineer', avatar: '/images/ourmemories/khaidoan.png' },
  { name: 'Nguyễn Dương Gia Bảo', role: 'Backend Engineer', avatar: '/images/ourmemories/baobao.png' },
  { name: 'Võ Việt Dũng', role: 'Frontend Engineer', avatar: '/images/ourmemories/dung.png' },
  { name: 'Phan Anh Hoàng', role: 'Frontend Engineer', avatar: '/images/ourmemories/hoang.png' },
  { name: 'Nguyễn Tuấn Khải', role: 'Frontend Engineer', avatar: '/images/ourmemories/khaidoan.png' },
];

const milestones = [
  { year: 2018, event: 'Thành lập công ty' },
  { year: 2019, event: 'Ra mắt sản phẩm đầu tiên' },
  { year: 2020, event: 'Mở rộng thị trường quốc tế' },
  { year: 2021, event: 'Đạt 1 triệu người dùng' },
  { year: 2022, event: 'Nhận giải thưởng Startup of the Year' },
];

export default function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Về Chúng Tôi
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Sứ Mệnh Của Chúng Tôi
            </Typography>
            <Typography variant="body1" paragraph>
              Chúng tôi là một công ty công nghệ tiên phong, tập trung vào việc phát triển các giải pháp sáng tạo để giải quyết những thách thức phức tạp nhất trong thế giới kỹ thuật số ngày nay.
            </Typography>
            <Typography variant="body1" paragraph>
              Với đội ngũ chuyên gia giàu kinh nghiệm và đam mê, chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng nhu cầu ngày càng tăng của khách hàng trong kỷ nguyên số.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Giá Trị Cốt Lõi
            </Typography>
            <List>
              {['Đổi mới', 'Chất lượng', 'Khách hàng là trọng tâm', 'Làm việc nhóm', 'Trách nhiệm xã hội'].map((value, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Lịch Sử Phát Triển
          </Typography>
          <Timeline position="alternate">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index !== milestones.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    {milestone.year}
                  </Typography>
                  <Typography>{milestone.event}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Đội Ngũ Của Chúng Tôi
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
                    />
                    <Typography variant="h6" component="div">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
