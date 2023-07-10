import { ResponsivePie } from '@nivo/pie'

const margin = { top: 40, right: 100, bottom: 30, left: 30 };

const styles = {
    root: {
      fontFamily: "consolas, sans-serif",
      textAlign: "center",
      position: "relative",
      width: 430,
      height: 300
    },
    overlay: {
      position: "absolute",
      top: 0,
      right: margin.right,
      bottom: 0,
      left: margin.left,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 48,
      color: "#000",
      // background: "#FFFFFF33",
      textAlign: "center",
      // This is important to preserve the chart interactivity
      pointerEvents: "none"
    },
    totalLabel: {
      fontSize: 24
    }
  };

const VaultChart = ({ data, centerText }) => {
  return (
    <div style={styles.root}>
      <ResponsivePie
        data={data}
        margin={margin}
        innerRadius={0.8}        
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 40,
                translateY: 34,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
      />
    <div style={styles.overlay}>
      <span> {centerText} </span>
      <span style={styles.totalLabel}></span>
    </div>
    </div>
  );
};

export default VaultChart;