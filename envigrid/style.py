from xml.etree.ElementTree import Element, SubElement, tostring
#from elementtree.ElementTree import Element, SubElement, tostring

def create_rule_lt(parent, title, value, color, colonna):
    rule=SubElement(parent,"Rule")
    SubElement(rule,"Title").text=title
    filter=SubElement(rule,"ogc:Filter")
    property=SubElement(filter,"ogc:PropertyIsLessThan")
    SubElement(property,"ogc:PropertyName").text=colonna
    SubElement(property,"ogc:Literal").text=value
    poligonsymbolizer=SubElement(rule,"PolygonSymbolizer")
    fill=SubElement(poligonsymbolizer,"Fill")
    SubElement(fill,"CssParameter", name="fill").text=color
    stroke=SubElement(poligonsymbolizer,"Stroke")
    SubElement(stroke,"CssParameter", name="stroke").text="#000000"
    SubElement(stroke,"CssParameter", name="stroke-width").text="0.5"

def create_rule_gt(parent, title, value, color, colonna):
    rule=SubElement(parent,"Rule")
    SubElement(rule,"Title").text=title
    filter=SubElement(rule,"ogc:Filter")
    property=SubElement(filter,"ogc:PropertyIsGreaterThan")
    SubElement(property,"ogc:PropertyName").text=colonna
    SubElement(property,"ogc:Literal").text=value
    poligonsymbolizer=SubElement(rule,"PolygonSymbolizer")
    fill=SubElement(poligonsymbolizer,"Fill")
    SubElement(fill,"CssParameter", name="fill").text=color
    stroke=SubElement(poligonsymbolizer,"Stroke")
    SubElement(stroke,"CssParameter", name="stroke").text="#000000"
    SubElement(stroke,"CssParameter", name="stroke-width").text="0.5"

def create_rule_bt(parent, title, value1, value2, color, colonna):
    rule=SubElement(parent,"Rule")
    SubElement(rule,"Title").text=title
    filter=SubElement(rule,"ogc:Filter")
    property=SubElement(filter,"ogc:PropertyIsBetween")
    SubElement(property,"ogc:PropertyName").text=colonna
    lowerboundary=SubElement(property,"ogc:LowerBoundary")
    SubElement(lowerboundary,"ogc:Literal").text="2"
    upperboundary=SubElement(property,"ogc:UpperBoundary")
    SubElement(upperboundary,"ogc:Literal").text="2.4"
    poligonsymbolizer=SubElement(rule,"PolygonSymbolizer")
    fill=SubElement(poligonsymbolizer,"Fill")
    SubElement(fill,"CssParameter", name="fill").text="#f7f7f7"
    stroke=SubElement(poligonsymbolizer,"Stroke")
    SubElement(stroke,"CssParameter", name="stroke").text="#000000"
    SubElement(stroke,"CssParameter", name="stroke-width").text="0.5"


def create_xml(layer, colonna, color, values):
    style=Element("StyledLayerDescriptor", version='"1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml"    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"')  #da modificare
    namedlayer=SubElement(style, "NamedLayer")
    SubElement(namedlayer, "Name").text=layer
    userstyle=SubElement(namedlayer, "UserStyle")
    SubElement(userstyle, "Name").text=layer
    SubElement(userstyle, "Title").text=layer
    featuretypestyle=SubElement(userstyle,"FeatureTypeStyle")
    index_color=0
    create_rule_lt(featuretypestyle, "< "+values[0], values[0], color[index_color], colonna)
    index_color+=1
    for i in range(len(values)-1):
        create_rule_bt(featuretypestyle, values[i]+"-"+values[i+1], values[i], values[i+1], color[index_color], colonna)
        index_color+=1
    create_rule_gt(featuretypestyle, "> "+values[len(values)-1], values[len(values)-1], color[index_color], colonna)
    xml=tostring(style)
    return xml.replace("&quot;",'"').replace('""','"')



#create_xml(["#f7f7f7","#e6f5d0","#a1d76a","#4d9221"],["2","2.4","2.8"])
