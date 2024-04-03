import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';
import WheelComponent from './WheelComponent';

const WheelOfFortune = (props: ComponentProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://api.jsonstorage.net/v1/json/5725bb31-8a05-4754-ba35-8f12024e78e4/b2e94e05-2bd3-4d9a-a2e4-c728cc6b76f8'
      );
      const parsed = await response.json();
      const emails = parsed.users.map(function (item: { email: string }) {
        return item.email;
      });

      setData(emails);
    })();
  }, []);

  console.log(data);

  if (data.length < 1) {
    return <></>;
  }

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
  ];
  const onFinished = (winner: string) => {
    console.log(winner);
    alert(winner);
  };
  return (
    <div className={`text-cta ${sxaStyles}`}>
      <WheelComponent
        segments={data}
        segColors={segColors}
        winningSegment={data[1]}
        onFinished={(winner: string) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={true}
        size={290}
        upDuration={100}
        downDuration={1000}
      />
    </div>
  );
};

export const Default = WheelOfFortune;
