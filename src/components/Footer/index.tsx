import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '石能出品 必属精品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'snnhome',
          title: '石能能官网',
          href: 'https://shinn.pro',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined />
              石能能github
            </>
          ),
          href: 'https://github.com/Stone-of-Learning',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
