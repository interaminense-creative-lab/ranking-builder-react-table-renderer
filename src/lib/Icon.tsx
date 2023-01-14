interface IIConProps {
  svg: string;
  width?: number;
}

export function Icon({ svg, width = 12 }: IIConProps) {
  return <img src={svg} alt="" width={width} />;
}
