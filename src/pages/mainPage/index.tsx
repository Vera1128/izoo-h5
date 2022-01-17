import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { connect } from 'react-redux'
import wx from 'weixin-js-sdk'

import { debounce } from 'src/utils'

import FocusOnCom from 'components/FocusOn'
import NearbyList from 'components/NearbyList'
import ThemeList from 'components/ThemeList'
import CityList from 'components/CityList'
import RecommendList from 'components/RecommendList'
import TopSearch from 'components/Search'
import EmptyBottom from 'components/EmptyBottom'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.less'

SwiperCore.use([Pagination, Autoplay])

const Index = ({
  history,
  offsetY,
  cityList,
  setOffsetY,
  getCityData,
  populerList,
  scrollList,
  themeList,
  nearbyList,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
  setSelectedId,
  setTheme,
  setCitySelectedId,
  getSignature,
}) => {
  const pageRef = useRef(null)
  useEffect(() => {
    getSignature(window.location.href).then(() => {
      wx.ready(() => {
        console.log('wx config success')
        wx.getLocation({
          success: function (res) {
            const { latitude, longitude } = res
            getNearbyData({
              longitude: `${longitude}`,
              latitude: `${latitude}`,
            })
          },
          error: function (res) {
            console.log('getLocation error')
            console.log(res)
          },
        })
        const shareInfo = {
          title: '测试主标题',
          desc: '测试副标题',
          link: window.location.href,
          imgUrl:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAGJhJREFUeJzdnWdQlVmax/mwVfNhq+bb1O5M220gZ0SCCJIvOUfJOUiSnDMoQSUpiIIBFNGLJCUIiCDIJaOIaVq7nda2u6e3+8Ps1lZtbU3Vf5/zIggSmnARek/VU3AvN72/+4T/c855X0REtnl8/ez5roHeAcf6moaQhrrmolv1LV0N15teN1xv/p/62ltYaDeuNv6T7v8bWdPNa43l16/w/Yb6HzrSa8j+/P7dH7b7WD7rePX8hcbjsUn+jdoGfkZSIT89sUCQllQAP48YONkehYmhJ7TU7aCiaAE5KSPISX40BWkTHFK1hRnPC3aWAfD3ikU6PTcjufBZelJhK4HlT41O8F/OPNXY7uPcsvHq+XN3Qf9DPnme4PzZK4gJz4SlsTf0NJ1wUMUaB+TNoShjwgGTFjOA5D49iO/RXWKS+/QhK8HjICvJmUJ1vxWBt4exvgciQ9NxruwSLl+oEwz2DvLpS3Pf7uMWypiemNrVWN/ifvtWGzJTTsLBKgAKUsaQIhhSBEpyoe3Vg8S86XL2KUQxZrvnTIczUWZfzdo+sr1kEvT6Vqa+5K2FaKhvRjP/dpLgwdCu7eax7vHLj+//2N3ewy/MPSM4FpIGfS1nKJG3yUoYfoC4tSCZscdLixtC/YANfChtZKaeEtxpbOf/+PY75e3ms6bx/PGTkMb65tbjmcWwMfeDOoWevCQP0qIET1T/s4Hc96U2Z2J79CBPX6IRhX5qQj74dc2DM1PT/O3mtOKgyqvR3dbTlRqfh0MqNpAR0+fgLbTtALlnoe3SJqimCAlIRuONVsHdO93GP3z3tz9uN7v5MXDvAT8/p/Sdt1skVBTMIStusGNB7vlSB1LiPNhS1Se18A+CeXe7+XGjr7uPnxSTC40D1gTP4IPp71iQu+ftMGSp8gf5JqCrrWf7Qn1yZCyi6WZrX0hAIhUSY8jOQ/z9gGQmSjnUyy0KJPKHhwcEUZ8V4oRgLKrs1Hm4OoSQ/jPlQvlzg2S35SSMoXvIG2YGYZxpq3tCXsqcHqe/ZpBffXGY5JIBrMz8cCK7FA/7h7YeJlXkXYL+oaKCnFIcolCWYwDn7DOClKQDV1W0h5dTDnKTGlGc040SsuyEBvi7FZLI95310DWCnDNZKRMkx+ejp6O3aGJ4fOt0J3ULRbXV12Fh5MlB3C6Q8lJmsDQ6htzERlSefLjI8lJa4euSR4/XWzdIZpoHHVFecgl37/QUbQnEyeHxqIKcMlhTx6Agxds+kGSaKq44FlCBshP3l4A8m9/PeaacpBnnlesFuZuquq6WC6c5h/ofCjfMScB6F+VV/Mr0oRx1J3MQtwMk8zRDLX+kx9TjXOHAEpDMTma0Q1XBnvPe9YL8ktlftCAraUzd0GmMPBwRnme2NbUPuzmGzkLcASD1Nf2QGlWHioKlIM+dHERB+h0oy9lsCiQznp479eot+Pv3b7/YNMQe6pmPBadQdTbbESCZqe93RKDHKSowPUtAlh6/h6RjNZAWM9pQaC8EyaSRq3ME7jR1DG0KYu/dXg6ispzJR4jbDZK8TErUkPKkC456F6MktwflBQ8472TVO9zvLEz1QjZUtT8FyWwfvZ+nWzS6O3qbfvnx/b+sGyIlWqu0hLx3Wmq2kF8IcQeAnJNAGsrOcHXMREhoJUKCK+BklUR9viskRY3WpSNXA7mLTI7684SY4z8M9A5orRtkW3P7NMuLitRG7TSQ4qIGkFSwgJy6A9R0vaFneQwGttFQkrWCOAFmXiRMkF/R460tAnCrvlWwLohPpx5HJ0RmU1404SDuNJCSspSvDT0ho+0CaR1XyJn4QMEmCKIEeL0t4lpAMttL7xtIffnj8cm1VfFff3z/x9qq660GWk6QlzTckSAlKNRkCKDkARuIy5pC6qADpLWcsW+v/paBZKa63xqVZ67c/fn9u9/uerrbuvnZKSehwCDuUJBi5HkSSlaQ0XODKH2effQcUXrNjUxarAckC/HoY1lo4t9efbbo+aPpXVnJhQJrU58dCVJcggdxaROIkeeJixtCWsMRUoecIEavt9HZn/WA/OLPWtCk90yKy3v9+sXLlZcshvoGBYHeMVBXMt+RIFkIyxw+wuVGFtYScmbkle4U3tQO0vM+B0hR+hJdnMKpfRxaufDcvNoIw8PO2C9jvCNBMoBSanaQ1nSCNP0uq+sGGZ4XpDSdIUbe+jlAsvBWVrRC5dkrWBbi9MSUBsuNKvKmJHl4OxIk80iWG7kcSd4oTbelDjlCUtmau+9zgORgfqHNVfCZqemkJSDvdd7jO5OEYADnbKeBlGQFhrxQjB7DzZCz4kPvx8JalGnHzwSSmZ62K1uRXFx0vnnxQqOipFqgpmi+fSDJpMSogEgaQZatgcuZQpb6e87I+2RJ5sgwEU6VWkrdnooNTyhLDRsFyfrwE9llQ2++fqU6D/LJ5BT/zOnz3DzjdoBk90tTjlNUsYWaoQd0HEJg6BENE/8Ezox942DoHgUtm2CoWQZAiUxS0ZLzzGVBzgEmL927Z4F9pcvNNwoD5Bd/1kRuZsk/H41NXZ0Hee1SPT86LP2zg2Q7IRSUraBtEwj7+BPwOHkO/uevIqy+CZEt7Yjt6CbrQUxbFyKb2+F38TqcCs/BOO0U1N2jIa/rCnFJHgdsDqQovb80vaaGw1HwQpNhnVkI+/xS2OYUwSgiHbLqdtizW08oIH29YnG+vOZjeMdFZPJtzHw/C0gZCl1FOlAd6yA4ZxTB/1wtolo6kDo0jIyx8XlLGxlF0kMBIjrvwa/hNlxqGuBYfR0OVddx5MpNuF66AdfKq3DOL4dpWBr0SbZZJJ2A3YkS2OWVwjQxF4YRqdDzj8VhtwgYHE2EQ8k5WKQVQJxShzBAHlS1Q8yx7Gdvv/lGVuTrp892RYWmCVhLuNUgpek+FXofnkcUvCiVMI9LJVgLAXIQh0cR09sP/8Y7OHL5JizLr8D4dBUsSXK4Xb2FUOah3fcRe38AsT19CL3RDP/L9fCtuwmbnNMwjkijFECOoelAAt6YPFAHcofsYX28CPanznIVXxggpcSNEBWehRdPnjqKjD0ccU+MyobGAastBSlDz1MliC7ZJQinA08TDC8ByCyVIB693QmnS/UwKa6CYWEljE5f4LwxqLUTCQ8eLvs8ZlEdXTALz4AiSaKFxYblRzUrf3jW1kHHL47aSp5QQDK14OUWzZYj8kQe3h985usWCTXWzWwRSDnyCn2nMArjGiQTiPSRsSUQkim0Q9u74V7XCLPSixxAA8qHzAt9G1oRT89j4b4SRGbp9PfoO13wLLoABRLurJVkfbgyzx02J4phmXUK4uSNe77SEQrIPVS8zIx9cb+rDyLtLZ2wMfPhFvq3BCT91KMqHFhdR2G8vBdmjI4hiPKkNeVL5n0GBec4iMZFVQigIpM4OLQqwEUw6bWS+wfhlFkEhYP2kDtoB/vCMjgWV0BG1VaoVXs3ebs2dVW3brRCpLG+Bab6btxygrBBsp21B+m1PU9XIvFe/7IHnkbeGUX5zp6KCO/U+VmIZCysPa83Ia5vkIOzVpBzMFmVt0sthBkVHdeqy9D1jaFcqSs0HclAsnZR7YAtai7egMiVC3XQJknA9ddCBnnI2At+5ZeRsoJHMU87evsubKj6cqE8D7Gag5hMHpw+unaA8zZOMB9NIunROML77sOy9AK0jmVB1TseiqQWJNTssWeP7qZBsvukJIxRVHgeIpVlF8E6GiVpI6GClJUwgGNKIZL6BlY8YP/GNtieXwyRmX1VHaJ7l/fgtUDMIIjpr58i/cUTJAwJ4HixHryT56F/ohw6GcXQCM+E9OEjBFNvUyDZTzZznptZCpHSk5XkjUazExVCBKll4YeQWv6yYcnCmckXy/Ia7gDnIVJeNKTPE0IFg1Xv9UOcQMbMY2S8eoqM59PImJrkClRoWzcszlyefx8G9GBYBmSNvbGHCtLGQc7CTE0shEhJQcVHiMIASb/Ly5rANbd02bzINGJs7wNOVC+CSGZMhcaBZM5qEmdFgJOTs/C+nkHGi+nZ2x/+zl7PtbZh0Xvp5pRBPSQdYtRqbgbkX/5dEykJBcIHKSdlDC1zXxzjty7rjXEU6l71zVxFXnhgLLytK2oQQmL7t2TOEojTj5DxcmYW4hP6fXLikwggbUoa9NMUop1yCjKGnjsTpKKCORwT85G4XI4jsD43W7hOZeEBMTM6dQEuV/iIJi9ec5VmEJ99COWXT7jcyOXIZR4bda+Pk1cLYepklUDRIUw4IM+XXeKWFoRVbFS1HBFYdY1CeGRxhR4YQnBrByzOXl4kcxZ6pDnlMSfqoaN7+rkUsCpAyn8cROaFTx/PQlwFOgtvj+uNlE4+gtTNLsV+54hNgWS6NCutCCIX6VvSVLGGkoxwQB629MexW7cXHUSKYAQ+/NsE6tKS8FoClA7UmfrrFas287iZDwCZTU8hY2JiVYjMUumLDaPOaWFe1sksgYJdyCbljxHJn0qI8K81wkjHBcqywhHkZoGJiOvoWZSffChfmpPnrwbw0zBnvXbyQ8HHMOdyIUF7SYXkrzOz3jj10QsLJscx8HoULS9HcXpqHGcfj+H+q1E00+3s8Y/5mWlUpg708yugFZ8PSepMNgqSPXY/Fauqc1epRWyi1szUW2gtok1UFhJ6+rgPziCwD8904acVelWjA2Xey2QL8yTO4+YgslzICsrUx3yYRVbyaAzfvx/B6LejHMTLM2N4/W4EY29GkTsx+7h4ah1ZamFRwcJaPSgVonLmm+psNEjc19U0QGSw98E7L5dwqCoKZ9LCMblgXoQzCGwu0ZR5wVohfjAGnnU88cMCzgOZwOa8cJmCkkW3zxC8//p5GE/fjuDc9Bjqno3i7z8O48XbUZz4ADJh4CE1ANdgQN6o5p8EKU0n7CZBveFJC8qPhrruaGvuhMjIgCAzMiQVB5UtNwVSTpKH/ZRrvUuq5ydpWQvIdOFv5cVPzYRew/byDfj1dCNphjzx2fQswInl8x/zyDPkkf/592HMfDcL8trTUfz0w2KQ8fQFm5MYV3YKg6iMKUHU2VRns486I2f7MAwPCAZFXjyZMU9PyPvvw+q2GwYpL2eCgzx3WMRnI/Ju9/w0GQtrGypmaw1no6ILMKWQdmu+jeDBfgLZg+jBQaSNrS6HMsmKp8bw9vsRDFNoM++89GQUL8k7x74dmQ/tGMrdmk7hEJM15WZuNttrS4gZ4mhAMiaGx71Fvnv96t/ijmU+MNZz2TBIFW1nHCkqh09dPUL4zUgZmO1MYu8/WDNIJolsr9TD5+5dhAgG4HmnHZbUh4eyWfQ1tIvM6xqej3K5MZ8Kz2kCe5PC+zIBzZrTknfuQoUE+F5qC4Ux+6Mkb4Hwo+lvXj1/MbuSWF5czQ/2jVsXSHafIhWoQ+Y+cC6qgG32KegcCYF1ZBbi7t6b126s0KwU2mzukXkgA+jX3YWggT54d3TCquoqjD/MjoeRF62102HVmeXLzA9emvPh9lzhi6B8LatszU3ICgOkg00wO8mp9Zcf389eBqK/u59/IrN4XSCVVW2g5xoGl1KqsFEZUDnsxPXYbCacLWaxD89mvdmM9/xk7YcQZt5nWnoRTvW3OHAMoGtTK6xJyJuWzWpNpifNSy8hhvry9c5HLmdsKs+XOioxcZ7Q5iNjI7PR3tL5cRVxfGhUozCnTLBmkGR67hE4UnaOvLEcqpQWWLFhVVvDwI1bk5mt2qMIom6GLR0s9ELL8zXwuN2GkKEBBPbdx5GGJpiVkyxZIJE4LUkFJ2FgnRMYK3U21CI6U0u4b5+BEEHmCNjp1Yt2W5Aw55vou60OkmApUGHRPRIKlzMkT9ILoKrjDFl63Jz8UdpvCfe8s7NrM6Pj3JKq67VbsKyshV3tbCUOfEAh3HmXKnM9zMlLPm0ZmTfakMiNob57XRMYq1gYfbkalgHc/KEwQLJNp+fKrizdJ/n00XR1RFDK/Aaq5UCynKhh6gWnU2dgGp4CVSoyDO5CHcmdre8ehRhK7NxM9cQkYgVDCHs4gNDhQXjcaYP91ZswO7vYAxca64KY/ly1316HpdPr+JLHS8rMVevNgWSPOeIYhpHBkeU3nBYXlK+6G02V8qBNSh7sjxdzmpHdt3Q+0pDLlUdrbyJ9hjqQb58h481zJD6egGt9ExfaK+rKDxO7XvwWzpOFAZHTs9S328QdF8ren11/OczJnoLjZ5ff1sdG1+2uaQ+nUMxtpvoUpL53JBxPloEXEMddp0JOgiSQtBGUSMyraNiTlvSAUUgi95ijra1IHB9G+hMS1I+nkEbeGUu60vtmCyfSLcjrTEsuklVzOZRNcXlcb+LmI5mQF0aBmfXGEQRRrlUj2SMMkLu/1IWOlgu7lMPKICcEYwrxEZmTxrouy4I0DU+lAlMJ46AEbrpMjfKjppUfTCLT4FxcAe+aOrhVXoRFUi60nY7Cq+TCooUvbqmUPI31vMe6ehHc2skZm5VhmjNpULCxJYaVINL7xXbeg0lQMiSlTYQCUkaSoi0wBWOC0dXPbrhR08CPi8hcFqSWfRDcKqoRMzGEmPEhJMyMc+Z7g0/wjkPLIRgKVGyYl7LFL137o6Tdlp8pZ/ctNGHBW2is4HmTt0tIGXObAoQB0s6aacey9l9++uFfVwX5zcuXUTVVde80KFw/BalEIa9G3sqqtoFnJPRcwqBl5Q81kj/7SVfKy5lyOXJuOZZVcIuQFNKV7UsmerfaWCT4UPo4oOvOVWph7I+UFOMhL/fMu+HB4bWdfjzQ84Dv6RwORWneUh3JJBBbA6eCIs95nuGK69psIUyRYNpRoo9qauOq55ZDJMmVRo0Ay4ua1kHcxIIwNpqyv1ma+qOt5e76LiRy7fKNfxqR9wll7w9JIkPXCBylg+Nmhjay6L+WnEiaM7azh+tgFA86cJuchLVjV4V0Y1XF1ZULzEqDup3+mPAMHKBw3fRuNLqPhb4J9fMR/FYkU/UWdl5kEOOosLgVVEDXJQLiJFH2bfI04zmQzKu93WMw0Du4vnMR2Xj1/MUu8krBEbtg7sTOTe+PZGJdzgw8j2h4klZkB50mGNm0dzKASf0DXH9vHZMLZW0XrrgIaw85u83T96Au5rLg0djkxi4Y8utP7/9wi7Sdjak3VXGeUHbssu3O8vJm3HZnn7KLnIcywZy+jlaQeTNLEfE99ykX1sOKVMZBEx/urNl9u4W3GZ91QVoaThsL6U/Hs0fTjlWUcwy1jwhvDzn9ZFeBUtZwgDYVBLuEPARW1SGcxDrbRRZHeY5NMiSStpyz+O77s3vJqWgF1/C5mXir6ByoGXhARtZsFqKQz2pQV7FFyakLmBgec9w0SDZ62nuKWL5kV5wS5mZ8KXqsLFV/ZXU78tAgmJJwZq2cW345fM5e4jbmc1ZZC6/iajhnFcM6Khu6pCjUDT2goGIDCfLwhZvxhQWSvYaPRyxabrUJ97I1XW3dpX6U39SZ4BYSSMlPThFhYNkF4KTZlBx5LDvnZs6k6D4J+hJZnys+d8LSFp1nwz6DPUXKnaaOaqFCZOP9397s6WjpRFxkFg4dsNr2SzFsFUhpSWME+Saya6WBO1thK8b0xFRcY33zlBfJC7bF5f8bSHYJBxuLAG5CYmJ4fGuuRLVwdN3pKg8LSITuIQdueeL3DpLdVpI3h6drJHo67lX/xw/fr95HC2u8f/OtWEdLRxGr5lYm3tyU2u8V5L6vdKF9yAl52WWssPBZCvssED8BqlpZevENT8eFE+2/N5AslA+pOeBCeQ2oARGOxNno+PWnH/7Av9b4LMArlkLdkeQRb8eDZH9XVrCgyhyMK1X1v7KrVG8rxLnxdOqxbHtLp19xwblJO3N/qClZcLPnOw3k3i91qLPiwZhEPNuK19XWI5ieeGSw3fyWHfc677Xn55T+6kQCm11PbSeAZLeVqM+3swpCamLBr7cbO9q3m9Nvjp/effenmclHeTXV18EEPE/HFQcU2JWgDT87SHafJNv8SsUkyC8B/LomPHv8JO+nd2//tN2c1jyeTz9x7O3szWxtuPOPtMR8ONsGQ1fTicuhWwmSFRD2LwbU9ltx180NC0pBXQ3/H33d/ZnbXlCEMR6PT5ZfOFvTGh2W8bO/ZywsjLzoYC25GffNgmTPYf8ww9zIG35U9OKjc1CUXzE4OTKet93HvSWDVcfn0zOZ9zp6BefPXEZkSBpcHcNgxvOkiu/E/YsVVSUr7Jcznd14wJYxFpgMebO8lDGlCguoK1vj8EEHGOm7w94qEIE+8aiuqP3fno7eB08mH/1+/ifDZsa3f/3rLmo3HbvbehxvXm10ZGDZNYcqSi+hIPcMUuJOICI4BSEBSYssNDAZMRFZJJ5Lcaa4Ctdr+Ohu7xmrr73l0tbc6Tgz9djmu9ev/207jun/AJSjWWjgAaj2AAAAAElFTkSuQmCC', // 分享图标
          fail: (res) => {
            console.log('设置失败信息', res)
          },
          success: (res) => {
            console.log('设置成功信息', res)
          },
        }
        wx.updateAppMessageShareData(shareInfo)
        wx.updateTimelineShareData(shareInfo)
      })
      wx.error((res: any) => {
        console.log('wx config error')
        console.log(res)
      })
    })
    getCityData()
    getPopulerData()
    getScrollData()
    getTagsData()
  }, [])
  useEffect(() => {
    pageRef.current.scrollTop = offsetY
  }, [pageRef.current])

  const scrollHandle = (e) => {
    setOffsetY(e.target.scrollTop)
  }

  const goToDetailInfoPage = (mainClassId) => () => {
    history.push(`/detailInfoPage/${mainClassId}`)
  }
  const clickMoreHandle = () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
  }
  const clickCityMoreHandle = () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
  }
  const themeClickHandle = (index) => () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
    setTheme('tag')
    setCitySelectedId(index)
  }
  const cityClickHandle = (index) => () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
    setTheme('city')
    setCitySelectedId(index)
  }
  return (
    <div className="mainPageContainer" ref={pageRef} onScroll={debounce(scrollHandle, 500)}>
      <TopSearch itemClick={goToDetailInfoPage} />
      <Swiper
        slidesPerView="auto"
        className="mySwiper"
        watchSlidesProgress={true}
        pagination={{
          clickable: false,
        }}
        onSwiper={() => {}}
        initialSlide={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {scrollList.map((item) => (
          <SwiperSlide key={item.mainClassId}>
            <img src={item.scrollImg} className="swiperContent" alt="轮播图" />
          </SwiperSlide>
        ))}
      </Swiper>
      <FocusOnCom />
      <NearbyList list={nearbyList} itemClick={goToDetailInfoPage} clickMoreHandle={clickMoreHandle} />
      <ThemeList list={themeList} itemClick={themeClickHandle} />
      <CityList list={cityList} itemClick={cityClickHandle} clickMoreHandle={clickCityMoreHandle} />
      <RecommendList list={populerList} itemClick={goToDetailInfoPage} />
      <EmptyBottom color="#666699" />
    </div>
  )
}

const mapState = ({ main: { offsetY, cityList, populerList, scrollList, themeList, nearbyList } }) => ({
  offsetY,
  cityList,
  populerList,
  scrollList,
  themeList,
  nearbyList,
})

const mapDispatch = ({
  main: { setOffsetY, getCityData, getPopulerData, getScrollData, getTagsData, getNearbyData },
  base: { setSelectedId, getSignature },
  allRoutes: { setTheme, setCitySelectedId },
}) => ({
  setOffsetY,
  getCityData,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
  setSelectedId,
  setTheme,
  setCitySelectedId,
  getSignature,
})

export default connect(mapState, mapDispatch)(Index)
