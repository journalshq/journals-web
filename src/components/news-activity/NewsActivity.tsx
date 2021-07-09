import { FC } from 'react';
import { NewsEventActivity, NewsHistoryTypes } from '../../typings';
import { AppstoreAddOutlined, BuildOutlined } from '@ant-design/icons';
import { NewsActivityHeader } from './NewsActivityHeader';
import { ENV } from '../../env';

interface Props {
  isLastActivity: boolean;
  activity: NewsEventActivity;
}

export const NewsActivity: FC<Props> = ({ activity, isLastActivity }) => {
  const isEventCreated = activity.type === NewsHistoryTypes.EVENT_CREATED;
  return (
    <div
      className={`w100 p15-25 rounded-1 border bg-white flex-fs ${
        !isLastActivity ? ' mb15' : ''
      }`}>
      <div className="img--40 circle bg-gray-200 flex-c flex-jc-c fs-xm lh-none mr15">
        {isEventCreated ? <BuildOutlined /> : <AppstoreAddOutlined />}
      </div>
      <div className="w100">
        <NewsActivityHeader activity={activity} />
        <div className="bg-gray-100 p5-15 mb10 rounded border">
          {activity?.statement?.text}
        </div>
        <div>
          {activity.media.map(item => (
            <div className="mr10">
              <img
                className="img--100 image-cover rounded-1 "
                src={`${ENV.IMAGES_CDN}/${item.mediaId}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
