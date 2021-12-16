import { red, grey } from '@mui/material/colors';
import { FavoriteBorderRounded, AccessTimeRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import moment from 'moment';

export const News = (props: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #979797',
        borderRadius: '6px',
        flex: {
          xs: '0 100%',
          md: '0 49%',
        },
        marginBottom: '10px',
        ':hover': {
          opacity: '40%',
        },
        cursor: 'pointer',
      }}
    >
      <div
        className='card-text'
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '14px 16px 14px 26px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '6px',
            color: '#767676',
            fontSize: '11px',
          }}
        >
          <AccessTimeRounded sx={{ color: grey[700], marginRight: '8px' }} />
          {moment(new Date(props.data.created_at)).fromNow()} by{' '}
          {props.data.author}
        </div>
        <div style={{ color: '#6b6b6b', fontWeight: 500, fontSize: '14px' }}>
          {props.data.story_title}
        </div>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          padding: '35px 22px 33px 22px',
          backgroundColor: '#f6f6f6',
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px',
        }}
      >
        <FavoriteBorderRounded
          color='primary'
          fontSize='large'
          sx={{ color: red[500] }}
        />
      </div>
    </Box>
  );
};
